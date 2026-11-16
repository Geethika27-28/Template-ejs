
document.addEventListener("DOMContentLoaded", () => {
    // Confirm before deleting a product
    const deleteForms = document.querySelectorAll(".delete-form");

    deleteForms.forEach((form) => {
        form.addEventListener("submit", (event) => {
            const confirmed = confirm(
                "Are you sure you want to delete this product?"
            );

            if (!confirmed) {
                event.preventDefault();
            }
        });
    });

    // Basic form validation
    const productForms = document.querySelectorAll(".product-form");

    productForms.forEach((form) => {
        form.addEventListener("submit", (event) => {
            const name = form.querySelector('[name="name"]');
            const price = form.querySelector('[name="price"]');
            const quantity = form.querySelector('[name="quantity"]');

            if (
                !name.value.trim() ||
                price.value === "" ||
                quantity.value === "" ||
                Number(price.value) < 0 ||
                Number(quantity.value) < 0
            ) {
                event.preventDefault();
                alert("Enter valid product details.");
            }
        });
    });
});
