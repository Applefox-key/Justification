import React, { useState } from "react";
import { RxLetterCaseUppercase } from "react-icons/rx";
import { sAlert } from "../../utils/alert";

const RubLinks = ({ links, fieldFn, editParam }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({ name: "", link: "", resp: [] });

  const openModalForEdit = (index) => {
    setEditingIndex(index);
    setFormData({
      name: links[index].name,
      link: links[index].link,
      resp: links[index].resp,
    });
    setModalOpen(true);
  };

  const openModalForAdd = () => {
    setEditingIndex(null);
    setFormData({ name: "", link: "", resp: [] });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (editingIndex === null) {
      fieldFn.addLinkToRub({
        name: formData.name,
        link: formData.link,
        resp: formData.resp,
      });
    } else {
      fieldFn.updateLinks(
        { name: formData.name, link: formData.link, resp: formData.resp },
        editingIndex
      );
    }
    setModalOpen(false);
  };

  const toggleCheckbox = (index, respNum) => {
    const prev = links[index].resp;
    const newLinkRespVal = prev.includes(respNum)
      ? prev.filter((i) => i !== respNum)
      : [...prev, respNum];

    fieldFn.updateLinks({ ...links[index], resp: newLinkRespVal }, index);
  };

  const getCheckedLinks = (respNum) => {
    const newVal = links
      .filter((obj) => obj.resp.includes(respNum))
      .map((el) => el.name.toUpperCase() + "\n" + el.link);
    return newVal.join("\n\n");
  };

  const copyChecked = (respNum, destination = "field") => {
    const selectedLinks = getCheckedLinks(respNum);
    if (selectedLinks) {
      if (destination === "field")
        fieldFn.setNewVal(selectedLinks, `link${respNum}`);
      else navigator.clipboard.writeText(selectedLinks);
    }
  };
  const deleteLink = (index) => {
    fieldFn.delLink(index);
  };
  const deleteAllLinks = async () => {
    const result = await sAlert({
      title: "Delete all links?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) fieldFn.setNewVal([], "links");
  };
  const changeAllByResp = (num, action) => {
    const newVal = links.map((obj) => {
      let newResp = [...obj.resp];
      if (action === "add" && !newResp.includes(num)) {
        newResp.push(num);
      } else if (action === "remove") {
        newResp = newResp.filter((n) => n !== num);
      }
      return { ...obj, resp: newResp };
    });
    fieldFn.setNewVal(newVal, "links");
  };

  return (
    <>
      <div className="resp-links-wrap">
        <div className="rub-one-link">
          <div className="links-resp-btn-h">
            COPY TO RESP
            <br /> COPY TO CLIPBOARD <br />
            <br />
            <div>
              <button onClick={openModalForAdd} className="btnToHis">
                ➕NEW
              </button>
              <button onClick={deleteAllLinks}>❌all</button>
            </div>
          </div>
          {/* <div className="rub-one-name ms-2">Links</div> */}
          {/* {(editParam.countR === 2 ? [1, 2] : [1, 2, 3, 4]).map((rsp) => ( */}
          {Array.from({ length: editParam.countR }, (_, i) => i + 1).map(
            (rsp) => (
              <div className="links-resp-btn">
                <button
                  title="SET CHECKED TO THE FIELD LINK"
                  onClick={() => copyChecked(rsp)}>
                  {rsp}
                </button>
                <button
                  title="COPY TO CLIPBOARD"
                  onClick={() => copyChecked(rsp, "buffer")}>
                  🗐
                </button>
                <button
                  title="CHECK ALL"
                  onClick={() => changeAllByResp(rsp, "add")}>
                  🗹
                </button>
                <button
                  title="UNCHECK ALL"
                  onClick={() => changeAllByResp(rsp, "remove")}>
                  ☐
                </button>
              </div>
            )
          )}
        </div>

        {links !== undefined &&
          links.map((oneLink, linkInd) => (
            <div key={linkInd} className="rub-one-link">
              <button onClick={() => deleteLink(linkInd)}>❌</button>
              <div
                className="rub-one-name"
                onContextMenu={(e) => {
                  e.preventDefault();
                  if (oneLink) {
                    navigator.clipboard.writeText(oneLink.link);
                  }
                }}>
                <div
                  style={{
                    cursor: "pointer",
                    textDecoration: "underline",
                    width: "100%",
                  }}
                  className="linkName"
                  onClick={(e) => {
                    e.stopPropagation();
                    modalOpen && editingIndex === linkInd
                      ? setModalOpen(false)
                      : openModalForEdit(linkInd);
                  }}>
                  {oneLink.name}
                </div>
              </div>
              {/* {(editParam.countR === 2 ? [1, 2] : [1, 2, 3, 4]).map((rsp) => ( */}
              {Array.from({ length: editParam.countR }, (_, i) => i + 1).map(
                (rsp) => (
                  <input
                    key={rsp}
                    id={`respnum${linkInd}-${rsp}`}
                    type="checkbox"
                    checked={oneLink.resp.includes(rsp)}
                    onChange={() => toggleCheckbox(linkInd, rsp)}
                  />
                )
              )}
            </div>
          ))}
      </div>

      {modalOpen && (
        <div className="rub-link-edit">
          <h4>{editingIndex === null ? "Add new link" : "Edit link"}</h4>

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
          <br />
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
