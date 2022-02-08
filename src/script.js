//Hide Successful Division
$(document).ready(function(){
    $('.success').hide();
});
$(document).ready(function(){
    $('.success').click(function()
    {
        $('.success').hide();
    })
});

//Hide Error Division
$(document).ready(function()
{
    $('.error').hide();
});
$(document).ready(function(){
    $('.error').click(function()
    {
        $('.error').hide();
    })
});

//Hide Success Div when adding new Element
$('#product_sku').click(function()
{
    $(".success").hide();
});

//Add Product Button Event
$(document).ready(function()
{
    $("#add-Product").click(function()
    {
        submitForm();
    })
});

let prodList = [];  //Global Object Array
let ERROR = []; //Global Error List
let editOn = false; //Flag to check if Edit is being done

// on click Add Product Button
function submitForm()
{
    pullValue();    //Pulling Value from the Input Fields
    clearFields();  //Clearing the Input Fields
    display();  //Display Function
}

//Pull Value from the Form
function pullValue()
{
    var pId = document.getElementById("product_sku").value;
    var pName = document.getElementById("product_name").value;
    var pPrice = document.getElementById("product_price").value;
    var quantity = document.getElementById("product_quantity").value;
    
    if (pId == "" || pName == "" || pPrice == "" || quantity == "")
    {
        var e = "Field(s) is/are empty.";
        ERROR.push(e);
        $(document).ready(function()
        {
            $('.error').show();
        });
        e += '<a href="#" class="close fa" style="font-size:16px">&#xf00d;</a>'
        $(document).ready(function(){
            $('.error').html(
                e
            )
        });
        return;
    }
    //Pushing the Data to the Object Array
    pushData(pId, pName, pPrice, quantity);
}

//Clear Input Fields
function clearFields()
{
    document.getElementById("product_sku").value = '';
    document.getElementById("product_name").value = '';
    document.getElementById("product_price").value = '';
    document.getElementById("product_quantity").value = '';
}

//Adding data to the Object Array
function pushData(pId, pName, pPrice, quantity)
{
    //Checking if the Product ID already Exists in the Array
    for (var x = 0; x < prodList.length; x++)
    {
        if ((prodList[x].PID == pId) && (editOn == false))
        {
            //If Exists in the Array. Alert the User and return.
            var e = "SKU Already Exists.";
            ERROR.push(e);
            $(document).ready(function()
            {
                $('.error').show();
            });
            e += '<a href="#" class="close fa" style="font-size:16px">&#xf00d;</a>'
            $(document).ready(function(){
                $('.error').html(
                e
                )
            });
            return;
        }
    }

    //If the Object is being edited
    if (editOn == true)
    {
        //finding the location of the Object in the Array
        for (var x = 0; x < prodList.length; x++)
        {
            if (prodList[x].PID == pId)
            {
                prodList[x].PName = pName;
                prodList[x].PPrice = pPrice;
                prodList[x].Quantity = quantity;
                editOn = false;
                document.getElementById("product_sku").disabled = false;
                document.getElementById("add-Product").innerHTML = "Add Product";
                return;         
            }
        }
    }

    //If Doesn't Exist then push onto the Array
    let prod = 
    {
        "PID": pId,
        "PName": pName,
        "PPrice": pPrice,
        "Quantity": quantity
    };

    // Pushing to the Object Array
    prodList.push(prod);
    $(document).ready(function(){
        $('.success').show();
    });
}

//Fetch Data from Object Array
function fetch(item)
{
    // Temp Array to store and return the Data for Individual Objects
    var out = [];
    out.push(item.PID);
    out.push(item.PName);
    out.push(item.PPrice);
    out.push(item.Quantity);
    return out;
}

//Display Function
function display()
{
    //Accessing Table Element in HTML
    var table = document.getElementById('f-head');
    
    //Tempororary Variable to Add Rows
    var html = "";

    //Clearing the Table
    table.innerHTML = "";

    //Table Header
    table.innerHTML += '<tr>\
            <th>SKU\</th>\
            <th>Name\</th>\
            <th>Price\</th>\
            <th>Quantity\</th>\
            <th>Action\</th>\
        </tr>';

    //Fetching the rows in Product List Array
    for (let item of prodList)
    {
        //Fetching each Object one after another
        out = fetch(item);

        html += '<tr>\
            <td>'+out[0]+'\</td>\
            <td>'+out[1]+'\</td>\
            <td>'+out[2]+'\</td>\
            <td>'+out[3]+'\</td>\
            <td style="font-size:16px; padding-right: 6px;" class="fa"><a href="#" onclick="editForm('+out[0]+')">&#xf040;</a>\</td>\
            <td style="font-size:20px" class="fa"><a href="#" onclick="delForm('+out[0]+')">&#xf00d;</a>\</td>\
        </tr>';
    }
    //Adding Rows to Table
    table.innerHTML += html;
}

function editForm(id)
{
    for (var i = 0; i < prodList.length; i++)
    {
        if (prodList[i].PID == id)
        {
            document.getElementById("product_sku").value = prodList[i].PID;
            document.getElementById("product_sku").disabled = true;
            document.getElementById("product_name").value = prodList[i].PName;
            document.getElementById("product_price").value = prodList[i].PPrice;
            document.getElementById("product_quantity").value = prodList[i].Quantity;

            document.getElementById("add-Product").innerHTML = "Edit Product";

            editOn = true;
        }
    }
}

function delForm(id)
{
    var i = prodList.length - 1;
    var conf = confirm("Are you sure you want to Delete?");
    while ((i >= 0) && conf == true)
    {
        if (prodList[i].PID == id)
        {
            prodList.splice(i,1);
        }
        i-=1;
    }
    display();
    alert("Entry Successfully Deleted");
}