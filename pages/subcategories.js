import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { withSwal } from 'react-sweetalert2';

function SubCategories({ swal }) {
  const [editedSubCategory, setEditedSubCategory] = useState(null);
  const [name, setName] = useState('');
  const [parentCategory, setParentCategory] = useState('');
  const [subCategories, setSubCategories] = useState([]);
  const [property, setproperty] = useState([]);

  useEffect(() => {
    fetchSubCategories();
  }, []);

  function fetchSubCategories() {
    axios.get('/api/subcategories').then(result => {
      setSubCategories(result.data);
    });
  }

  async function saveSubCategory(ev) {
    ev.preventDefault();
    const data = {
      name,
      parentCategory,
      property: property.map(p => ({
        name: p.name,
        values: p.values.split(','),
      })),
    };
    if (editedSubCategory) {
      data._id = editedSubCategory._id;
      await axios.put('/api/subcategories', data);
      setEditedSubCategory(null);
    } else {
      await axios.post('/api/subcategories', data);
    }
    setName('');
    setParentCategory('');
    setproperty([]);
    fetchSubCategories();
  }

  function editSubCategory(subCategory) {
    setEditedSubCategory(subCategory);
    setName(subCategory.name);
    setParentCategory(subCategory.parent?._id);
    setproperty(
      subCategory.property.map(({ name, values }) => ({
        name,
        values: values.join(',')
      }))
    );
  }

  function deleteSubCategory(subCategory) {
    swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete ${subCategory.name}?`,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes, Delete!',
      confirmButtonColor: '#d55',
      reverseButtons: true,
    }).then(async result => {
      if (result.isConfirmed) {
        const { _id } = subCategory;
        await axios.delete('/api/subcategories?_id=' + _id);
        fetchSubCategories();
      }
    });
  }

  function addProperty() {
    setproperty(prev => {
      return [...prev, { name: '', values: '' }];
    });
  }

  function handlePropertyNameChange(index, property, newName) {
    setproperty(prev => {
      const property = [...prev];
      property[index].name = newName;
      return property;
    });
  }

  function handlePropertyValuesChange(index, property, newValues) {
    setproperty(prev => {
      const property = [...prev];
      property[index].values = newValues;
      return property;
    });
  }

  function removeProperty(indexToRemove) {
    setproperty(prev => {
      return [...prev].filter((p, pIndex) => {
        return pIndex !== indexToRemove;
      });
    });
  }

  return (
    <Layout>
      <h1>SubCategories</h1>
      <label>
        {editedSubCategory
          ? `Edit sub-category ${editedSubCategory.name}`
          : 'Create new sub-category'}
      </label>
      <form onSubmit={saveSubCategory}>
        <div className="flex gap-1">
          <input
            type="text"
            placeholder={'Sub-category name'}
            onChange={ev => setName(ev.target.value)}
            value={name} />
          <select
            onChange={ev => setParentCategory(ev.target.value)}
            value={parentCategory}>
            <option value="">No parent category</option>
            {subCategories.length > 0 && subCategories.map(category => (
              <option key={category._id} value={category._id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          <label className="block">property</label>
          <button
            onClick={addProperty}
            type="button"
            className="btn-default text-sm mb-2">
            Add new property
          </button>
          {property.length > 0 && property.map((property, index) => (
            <div key={index} className="flex gap-1 mb-2">
              <input type="text"
                className="mb-0"
                onChange={ev => handlePropertyNameChange(index, property, ev.target.value)}
                value={property.name}
                placeholder="property name (example: color)" />

              <input type="text"
                className="mb-0"
                onChange={ev =>
                  handlePropertyValuesChange(
                    index,
                    property, ev.target.value
                  )}
                value={property.values}
                placeholder="values, comma separated" />

              <button
                onClick={() => removeProperty(index)}
                type="button"
                className="btn-red">
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-1">
          {editedSubCategory && (
            <button
              type="button"
              onClick={() => {
                setEditedSubCategory(null);
                setName('');
                setParentCategory('');
                setproperty([]);
              }}
              className="btn-default">Cancel</button>
          )}
          <button type="submit"
            className="btn-primary py-1">
            Save
          </button>
        </div>
      </form>
      {!editedSubCategory && (
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">Sub-category name</th>
              <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">Parent category</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subCategories.length > 0 && subCategories.map(subCategory => (
              <tr key={subCategory._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 text-gray-800">{subCategory.name}</td>
                <td className="border border-gray-300 px-4 py-2 text-gray-800">{subCategory?.parent?.name}</td>
                <td className="border border-gray-300 px-4 py-2 flex justify-center">
                  <button
                    onClick={() => editSubCategory(subCategory)}
                    className="btn-default mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteSubCategory(subCategory)}
                    className="btn-red"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
}

export default withSwal(({ swal }, ref) => (
  <SubCategories swal={swal} />
));
