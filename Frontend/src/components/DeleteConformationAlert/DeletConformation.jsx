import Swal from "sweetalert2";

const DeleteConformation = (id, callBackConfirm) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",

    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      callBackConfirm(id);
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
    }
    // else if (result.isConfirmed && id ==1 ){
    //     alert("you cannot delete this item")
    // }
  });
};

export default DeleteConformation;
