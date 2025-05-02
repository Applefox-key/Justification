import React, { useState } from "react";
import { ImCopy } from "react-icons/im";
import { RxLetterCaseUppercase } from "react-icons/rx";

const RubLinks = ({ links, fieldFn }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({ name: "", link: "" });
  const [checkedIndices, setCheckedIndices] = useState([]);
  const openModalForEdit = (index) => {
    setEditingIndex(index);
    setFormData({ name: links[index].name, link: links[index].link });
    setModalOpen(true);
  };

  const openModalForAdd = () => {
    setEditingIndex(null);
    setFormData({ name: "", link: "" });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (editingIndex === null) {
      fieldFn.addLinkToRub({ name: formData.name, link: formData.link });
    } else {
      fieldFn.updateLinks(
        { name: formData.name, link: formData.link },
        editingIndex
      );
    }
    setModalOpen(false);
  };

  const toggleCheckbox = (index) => {
    setCheckedIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const copyCheckedLinks = () => {
    const selectedLinks = checkedIndices.map((i) => links[i].link).join("\n\n");
    if (selectedLinks) {
      navigator.clipboard.writeText(selectedLinks);
    }
  };
  const copyCheckedLinksN = () => {
    const selectedLinks = checkedIndices
      .map((i) => links[i].name.toUpperCase() + "\n" + links[i].link)
      .join("\n\n");
    if (selectedLinks) {
      navigator.clipboard.writeText(selectedLinks);
    }
  };
  const deleteLink = (index) => {
    fieldFn.delLink(index);
  };

  return (
    <>
      <div className="resp-links-wrap">
        <div className="d-flex justify-content-between">
          <h4 onClick={copyCheckedLinksN} className="btnL ">
            LINKS <ImCopy />
          </h4>

          <div>
            <button
              title="CLEAR"
              onClick={() => setCheckedIndices([])}
              className="btnToHis ">
              ◻️
            </button>{" "}
            <button
              onClick={() => setCheckedIndices(links.map((l, i) => i))}
              className="btnToHis">
              ✔️
            </button>{" "}
            <button onClick={openModalForAdd} className="btnToHis">
              ➕
            </button>
            <button
              title="COPY"
              onClick={copyCheckedLinks}
              className="btnToHis">
              <ImCopy />
            </button>
          </div>
        </div>

        {links !== undefined &&
          links.map((el, i) => (
            <div
              key={i}
              className="rub-one-link"
              onClick={() => toggleCheckbox(i)}>
              <div
                className="rub-one-name"
                onContextMenu={(e) => {
                  e.preventDefault();
                  if (links[i]) {
                    navigator.clipboard.writeText(links[i].link);
                  }
                }}>
                <div
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    modalOpen && editingIndex === i
                      ? setModalOpen(false)
                      : openModalForEdit(i);
                  }}>
                  {el.name}
                </div>
              </div>{" "}
              <input
                type="checkbox"
                checked={checkedIndices.includes(i)}
                onChange={() => toggleCheckbox(i)}
              />
              <button
                onClick={() => deleteLink(i)}
                className="btnToHis hintBtn">
                🗑️
              </button>
            </div>
          ))}
      </div>

      {modalOpen && (
        <div className="rub-link-edit">
          <h4>{editingIndex === null ? "Add new" : "Edit"}</h4>
          {/* <p> {formData.name}</p> */}
          <label>
            Name:
            <textarea
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </label>
          <br />
          <label>
            Link:
            <textarea
              value={formData.link}
              onChange={(e) =>
                setFormData({ ...formData, link: e.target.value })
              }
            />
          </label>
          <br />{" "}
          <button
            title="Uppercase name"
            onClick={() =>
              setFormData({ ...formData, name: formData.name.toUpperCase() })
            }
            disabled={!formData.name}
            className="square-btn ordinary">
            <RxLetterCaseUppercase />
          </button>
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setModalOpen(false)}>Cancel</button>
        </div>
      )}
    </>
  );
};

export default RubLinks;
