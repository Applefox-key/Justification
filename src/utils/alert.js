import Swal from "sweetalert2";

export const sAlert = async (config) => {
  return Swal.fire({
    ...config,
    customClass: {
      popup: "my-popup",
      title: "my-title",
      confirmButton: "my-confirm-btn",
      cancelButton: "my-cancel-btn",
      icon: "my-icon",
    },
  });
};

// await sAlert({
//         title: "What do you want to find?",
//         input: "text",
//         inputPlaceholder: "please print your text...",
//         showCancelButton: true,
//         confirmButtonText: "Find",
//         cancelButtonText: "Cancel",
//         reverseButtons: true,
//         inputValidator: (value) => {
//           if (!value) return;
//         },
//       });

// const result = await sAlert({
//   title: "Delete this tag?",
//   text: "Only the tag will be removed. The linked expressions will remain unchanged.",
//   icon: "question",
//   showCancelButton: true,
//   confirmButtonText: "Yes, delete it",
//   cancelButtonText: "Cancel",
// });

// if (!result.isConfirmed) return;

// sAlert({
//     title: "Apply action?",
//     text: "Action will be apply for all selected items",
//     icon: "question",
//     showCancelButton: true,
//     confirmButtonText: "Yes",
//     cancelButtonText: "No",
//   }).then((result) => {
//     if (result.isConfirmed) {
//       expressionActions[fnName]({ list: applyMode.list, ...param });
//       applyMode.applyOnOF();
//     }
//   });
