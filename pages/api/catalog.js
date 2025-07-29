import {mongooseConnect} from "@/lib/mongoose";
import Catalog from "@/models/Catalog";

export default async function handler(req, res) {
    await mongooseConnect();
    const method = req.method;

    switch (method) {
        case 'GET':
            try {
                const { url } = req.query;
                if (url) {
                    const catalog = await Catalog.findOne({ url });
                    res.status(200).json(catalog);
                } else {
                    const catalogs = await Catalog.find({});
                    res.status(200).json(catalogs);
                }
            } catch (error) {
                res.status(500).json({ error: 'Internal Server Error' });
            }
            break;

        case 'POST':
            try {
                const { url, pdfUrl } = req.body;
                if (!url || !pdfUrl) {
                    return res.status(400).json({ error: 'URL and PDF URL are required.' });
                }
                const newCatalog = new Catalog({ url, pdfUrl });
                await newCatalog.save();
                res.status(201).json(newCatalog);
            } catch (error) {
                res.status(500).json({ error: 'Internal Server Error' });
            }
            break;

        case 'PUT':
            try {
                const { id, url, pdfUrl } = req.body;
                if (!id || !url || !pdfUrl) {
                    return res.status(400).json({ error: 'ID, URL, and PDF URL are required.' });
                }
                const updatedCatalog = await Catalog.findByIdAndUpdate(id, { url, pdfUrl }, { new: true });
                if (!updatedCatalog) {
                    return res.status(404).json({ error: 'Catalog not found.' });
                }
                res.status(200).json(updatedCatalog);
            } catch (error) {
                res.status(500).json({ error: 'Internal Server Error' });
            }
            break;

        case 'DELETE':
            try {
                const { id } = req.query;
                if (!id) {
                    return res.status(400).json({ error: 'ID is required.' });
                }
                const deletedCatalog = await Catalog.findByIdAndDelete(id);
                if (!deletedCatalog) {
                    return res.status(404).json({ error: 'Catalog not found.' });
                }
                res.status(204).end();
            } catch (error) {
                res.status(500).json({ error: 'Internal Server Error' });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }


}
