import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { CircleUserRound, User } from 'lucide-react'
import { useParams, useNavigate } from 'react-router-dom';
import Image from "next/image";
import "react-quill/dist/quill.snow.css";
import dynamic from 'next/dynamic';
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
import Spinner from "@/components/Spinner";
import { ReactSortable } from "react-sortablejs";
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



export default function EditBlog() {


    const quillModules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],              // toggled buttons
            ['blockquote', 'code-block'],                            // block elements
            ['link', 'image', 'video', 'formula'],                   // media
            [{ 'header': 1 }, { 'header': 2 }],                      // custom button values
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }], // lists
            [{ 'script': 'sub' }, { 'script': 'super' }],            // superscript/subscript
            [{ 'indent': '-1' }, { 'indent': '+1' }],                // outdent/indent
            [{ 'direction': 'rtl' }],                               // text direction
            [{ 'size': ['small', false, 'large', 'huge'] }],        // custom dropdown sizes
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],              // custom header sizes
            [{ 'color': [] }, { 'background': [] }],                 // color and background
            [{ 'font': [] }],                                       // font family
            [{ 'align': [] }],                                      // text alignment
            ['clean']                                                // remove formatting button
        ],
    };

    const quillFormats = [
        'bold', 'italic', 'underline', 'strike',
        'blockquote', 'code-block',
        'link', 'image', 'video', 'formula',
        'header', 'list', 'bullet', 'check',
        'script', 'indent', 'direction',
        'size', 'color', 'background',
        'font', 'align',
        'clean'
    ];



    const [blogInfo, setBlogInfo] = useState([]);
    const [blogTitle, setBlogTitle] = useState('');
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);
    const [url, setUrl] = useState('');
    const [mtitle, setmtitle] = useState('');
    const [mdiscription, setmdiscription] = useState('');
    const [keyword, setkeyword] = useState('');
    const [author, setauthor] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const URL = process.env.NEXT_PUBLIC_UPLOAD_API;
    // const navigate = useNavigate();
    const router = useRouter();

    const { title } = router.query;

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/api/blogs?url=' + title);
            const result = await res.json();
            if (result.success) {
                setBlogTitle(result.data?.title);
                setContent(result.data?.content);
                setImages([result.data?.cardImage]);
                setUrl(result.data?.url);
                setmtitle(result.data?.mtitle);
                setmdiscription(result.data?.mdiscription);
                setkeyword(result.data?.keyword);
                setauthor(result.data?.author);

            }
        };

        fetchData();
    }, [title]);

    function updateImagesOrder(images) {
        setImages(images);
    }


    async function uploadImages(ev) {
        const files = ev.target?.files;
        if (files?.length > 0) {
            setIsUploading(true);
            const data = new FormData();
            for (const file of files) {
                data.append("file", file);
            }
            //console.log("url are", URL);
            const res = await axios.post(`${URL}:5000/api/upload`, data);
            // console.log(res);
            setImages([res.data.fileUrl])
            setIsUploading(false);
        }
    }


    const showToast = (type, message, options = {}) => {
        const toastOptions = {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
            ...options, // Merge any additional options
        };

        switch (type) {
            case 'success':
                toast.success(message, toastOptions);
                break;
            case 'info':
                toast.info(message, toastOptions);
                break;
            case 'error':
                toast.error(message, toastOptions);
                break;
            default:
                toast(message, toastOptions); // Fallback to a default toast
                break;
        }
    };


    const handleSubmit = (event) => {
        event.preventDefault();

        const blogData = {
            title: blogTitle,
            content,
            cardImage: images[0],
            url,
            mtitle,
            mdiscription,
            keyword,
            author,
        };

        //console.log(blogData)

        if (title) {
            axios.put(`/api/blogs`, blogData)
                .then(() => {
                    showToast('success', 'Blog updated  successfully', { autoClose: 3000 });
                })
                .catch(error => {
                    console.error('There was an error updating the blog!', error);
                });
        } else {
            axios.post('/api/blogs', blogData)
                .then(() => {
                    navigate('/dashboard');
                })
                .catch(error => {
                    console.error('There was an error creating the blog!', error);
                });
        }
    };


    const removeImage = (index) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages); // Update your state with the new array
    };


    console.log("images",images);
    

    return (
        <Layout>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"

            />
            <div className='bg-white p-4'>
                <h1 className="h-1 mb-10  font-bold text-3xl" >{'Edit Blog'}</h1>
                <form onSubmit={handleSubmit}>

                    <div className="border-2 p-3 ">
                        <h2 className="font-serif">For SEO </h2>
                        <div>
                            <label>URL</label>
                            <input
                                className='className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"'
                                type="text"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Meta title</label>
                            <input
                                className='className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"'
                                type="text"
                                value={mtitle}
                                onChange={(e) => setmtitle(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Meta Discription</label>
                            <input
                                className='className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"'
                                type="text"
                                value={mdiscription}
                                onChange={(e) => setmdiscription(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Keyword with comma </label>
                            <input
                                className='className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"'
                                type="text"
                                value={keyword}
                                onChange={(e) => setkeyword(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Author</label>
                            <input
                                className='className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"'
                                type="text"
                                value={author}
                                onChange={(e) => setauthor(e.target.value)}
                            />
                        </div>

                    </div>
                    <label>Card / Background Image</label>
                    <div className="mb-2 flex flex-wrap gap-1">
                        <ReactSortable
                            list={images}
                            className="flex flex-wrap gap-1"
                            setList={updateImagesOrder}
                        >
                            {!!images?.length &&
                                images?.map((link, index) => (
                                    <div
                                        key={link}
                                        className="relative h-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200"
                                    >
                                        <img
                                            src={link}
                                            alt=""
                                            className="rounded-lg"
                                            height={100}
                                            width={100}
                                        />
                                        {/* Remove button */}
                                        <button
                                            onClick={() => removeImage(index)}
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={2}
                                                stroke="currentColor"
                                                className="w-4 h-4"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                        </ReactSortable>
                        {isUploading && (
                            <div className="h-24 flex items-center">
                                <Spinner />
                            </div>
                        )}
                        <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                                />
                            </svg>
                            <div>Add image</div>
                            <input type="file" onChange={uploadImages} className="hidden" />
                        </label>
                    </div>


                    <div>
                        <label>Title:</label>
                        <input
                            className='className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"'
                            type="text"
                            value={blogTitle}
                            onChange={(e) => setBlogTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Content:</label>
                        <JoditEditor
                            value={content}
                            config={editorConfig}
                            onChange={(value) => setContent(value)}
                        />
                        <button type="submit" className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 mt-14 ml-96" >Save</button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}


const copyStringToClipboard = (str) => {
    const el = document.createElement("textarea");
    el.value = str;
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
};

const facilityMergeFields = [
    "FacilityNumber",
    "FacilityName",
    "Address",
    "MapCategory",
    "Latitude",
    "Longitude",
    "ReceivingPlant",
    "TrunkLine",
    "SiteElevation"
];
const inspectionMergeFields = [
    "InspectionCompleteDate",
    "InspectionEventType"
];

const createOptionGroupElement = (mergeFields, optionGroupLabel) => {
    const optionGroupElement = document.createElement("optgroup");
    optionGroupElement.setAttribute("label", optionGroupLabel);
    mergeFields.forEach((field) => {
        const optionElement = document.createElement("option");
        optionElement.setAttribute("class", "merge-field-select-option");
        optionElement.setAttribute("value", field);
        optionElement.text = field;
        optionGroupElement.appendChild(optionElement);
    });
    return optionGroupElement;
};

const buttons = [
    "undo",
    "redo",
    "|",
    "bold",
    "strikethrough",
    "underline",
    "italic",
    "|",
    "superscript",
    "subscript",
    "|",
    "align",
    "|",
    "ul",
    "ol",
    "outdent",
    "indent",
    "|",
    "font",
    "fontsize",
    "brush",
    "paragraph",
    "|",
    "image",
    "link",
    "table",
    "|",
    "hr",
    "eraser",
    "copyformat",
    "|",
    "fullsize",
    "selectall",
    "print",
    "|",
    "source",
    "|",
    {
        name: "insertMergeField",
        tooltip: "Insert Merge Field",
        iconURL: "/images/merge.png", // Update for public folder
        popup: (editor) => {
            const onSelected = (e) => {
                const mergeField = e.target.value;
                if (mergeField) {
                    editor.selection.insertNode(
                        editor.create.inside.fromHTML(`{{${mergeField}}}`)
                    );
                }
            };

            const divElement = editor.create.div("merge-field-popup");

            const labelElement = document.createElement("label");
            labelElement.setAttribute("class", "merge-field-label");
            labelElement.textContent = "Merge field: ";
            divElement.appendChild(labelElement);

            const selectElement = document.createElement("select");
            selectElement.setAttribute("class", "merge-field-select");
            selectElement.appendChild(createOptionGroupElement(facilityMergeFields, "Facility"));
            selectElement.appendChild(createOptionGroupElement(inspectionMergeFields, "Inspection"));
            selectElement.onchange = onSelected;
            divElement.appendChild(selectElement);

            return divElement;
        }
    },
    {
        name: "copyContent",
        tooltip: "Copy HTML to Clipboard",
        iconURL: "/images/copy.png", // Update for public folder
        exec: (editor) => {
            const html = editor.value;
            copyStringToClipboard(html);
        }
    }
];

// const editorConfig = {
//     readonly: false,
//     toolbar: true,
//     spellcheck: true,
//     language: "en",
//     toolbarButtonSize: "medium",
//     toolbarAdaptive: false,
//     showCharsCounter: true,
//     showWordsCounter: true,
//     showXPathInStatusbar: false,
//     askBeforePasteHTML: true,
//     askBeforePasteFromWord: true,
//     buttons: buttons,
//     uploader: {
//         insertImageAsBase64URI: true
//     },

//     height: 842,
//     style: {
//         font: [
//             { name: "Arial", value: "Arial" },
//             { name: "Verdana", value: "Verdana" },
//             { name: "Poppins", value: "'Poppins', sans-serif" } // Added Poppins font
//         ]
//     }
// };


const editorConfig = {
    readonly: false,
    toolbar: true,
    spellcheck: true,
    language: "en",
    toolbarButtonSize: "medium",
    toolbarAdaptive: false,
    showCharsCounter: true,
    showWordsCounter: true,
    showXPathInStatusbar: false,
    askBeforePasteHTML: true,
    askBeforePasteFromWord: true,
    buttons: buttons,
    uploader: {
        insertImageAsBase64URI: true
    },
    height: 842,
    style: {
        font: [

            { name: "Poppins", value: "'Poppins', sans-serif" } // Added Poppins font
        ]
    },
    controls: {
        font: {
            list: {

                "Poppins": "'Poppins', sans-serif" // Add Poppins here too
            }
        },

    }
};
