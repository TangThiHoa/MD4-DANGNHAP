function loadData() {
    $.ajax({
        headers: {
            Authorization: 'Bearer ' + accessToken
        },
        type: "GET",
        url: "http://localhost:8000/products",
        success: function (products) {
            console.log(products)
            document.getElementById("product").innerHTML = ` <div class="col-3"></div>
    <div class="col-9">
        <h3>List product</h3>
        <table class="table">
            <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Category</th>
            </tr>
            </thead>
            <tbody id="table">
            </tbody>
        </table>
    </div>`
            loadTableProduct(products)
        },
        error: function (error) {
            console.log(error)
            alert("Bạn không vào được trang này ")

        }
    })
}

function loadTableProduct(products) {
    let str = "";
    for (let i = 0; i < products.length; i++) {
        str += `<tr>
                    <td>${i + 1}</td>
                    <td>${products[i].name}</td>
                    <td>${products[i].price}</td>
                    <td>${products[i].category.name}</td> 
                    <td> <button type="button" onclick="formEditData(${products[i].id})"> Edit </button></td>
                    <td> <button type="button" onclick="showDeleteForm(${products[i].id})"> Delete</button></td>
                </tr>`
    }

    document.getElementById("table").innerHTML = str;
}

function formEditData(id) {
    $('#exampleModal4').modal('show')
    $.ajax({
        headers: {
            Authorization: 'Bearer ' + accessToken
        },
        type: 'GET',
        url: 'http://localhost:8000/admin/products/' + id,
        success: function (data) {
            console.log(data)
            document.getElementById("p.name").value = data.name;
            document.getElementById("p.price").value = data.price;
            document.getElementById("p.category").value = data.category.name;
        },
        error: function (error) {
            console.log(error)
        }
    })
}
function update(id) {
    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;
    let categoryId = document.getElementById("category").value;
    let pro = {
        id: id,
        name: name,
        price: price,
        category: {
            id: categoryId
        }
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken
        },
        type: 'PUT',
        url: 'http://localhost:8000/admin/products/' + id,
        data: JSON.stringify(pro),
        success: function () {
            loadData()
        },
        error: function (error) {
            console.log(error)
        }
    })
}
