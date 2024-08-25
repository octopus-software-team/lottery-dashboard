import InputField from "../../ui/InputField";

export default function Categories({
  formData,
  setFormData,
  categoriesInitial
}) {
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedCategoriesList = [...formData.categories];
    updatedCategoriesList[index] = {
      ...updatedCategoriesList[index],
      [name]: value
    };
    setFormData((prev) => ({
      ...prev,
      categories: updatedCategoriesList
    }));
  };

  const handleAddRow = () => {
    const updatedCategoriesList = [
      ...formData.categories,
      { ...categoriesInitial }
    ];
    setFormData((prev) => ({
      ...prev,
      categories: updatedCategoriesList
    }));
  };

  const handleDeleteRow = (index) => {
    const updatedCategoriesList = formData?.categories?.filter(
      (_, i) => i !== index
    );
    setFormData((prev) => ({
      ...prev,
      categories: updatedCategoriesList
    }));
  };

  return (
    <div className="categories">
      <h6>التصنيف</h6>
      {formData?.categories?.map((item, index) => (
        <div className="select_addon_row" key={index}>
          <InputField
            placeholder="أدخل اسم التصنيف"
            id={`category-name-${index}`}
            name="title"
            type="text"
            required
            disabled={item?.type !== "new"}
            value={item.title}
            onChange={(e) => handleChange(e, index)}
          />
          <InputField
            id={`category-count-${index}`}
            placeholder="العدد"
            type="number"
            required
            name="count"
            disabled={item?.type !== "new"}
            value={item.count}
            onChange={(e) => handleChange(e, index)}
          />
          {index === 0 ? (
            <button onClick={handleAddRow} type="button">
              <img src="/assets/images/plus.svg" alt="add icon" />
            </button>
          ) : (
            <button
              onClick={() => handleDeleteRow(index)}
              className="delete"
              type="button"
              disabled={item?.type !== "new"}
            >
              <img src="/assets/images/delete.svg" alt="delete icon" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
