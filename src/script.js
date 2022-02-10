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
    var SKU = $("#product_sku").val();
    var productName = $("#product_name").val();
    var productPrice = $("#product_price").val();
    var quantity = $("#product_quantity").val();
    
    if (fieldCheck(SKU, productName, productPrice, quantity) == false)
    {
        //Pushing the Data to the Object Array
        pushData(SKU, productName, productPrice, quantity);
    }
}

function fieldCheck(SKU, productName, productPrice, quantity)
{
    if (SKU == "" || productName == "" || productPrice == "" || quantity == "")
    {
        ERROR.push("All Fields cannot be empty.");
        errorChangeAndDisplay("All Fields cannot be empty.");
        return true;
    }
    return false;
}

//Clear Input Fields
function clearFields()
{
    $("#product_sku").val("");
    $("#product_name").val("");
    $("#product_price").val("");
    $("#product_quantity").val("");
}

//Adding data to the Object Array
function pushData(SKU, productName, productPrice, quantity)
{
    //Checking if the Product ID already Exists in the Array
    for (var x = 0; x < prodList.length; x++)
    {
        if ((prodList[x].SKU == SKU) && (editOn == false))
        {
            //If Exists in the Array. Alert the User and return.
            ERROR.push("SKU Already Exists.");
            errorChangeAndDisplay("SKU Already Exists.");
            return;
        }
    }

    //If the Object is being edited
    if (editOn == true)
    {
        //finding the location of the Object in the Array
        for (var x = 0; x < prodList.length; x++)
        {
            if (prodList[x].SKU == SKU)
            {
                //Changing the Value of Object
                prodList[x].productName = productName;
                prodList[x].productPrice = productPrice;
                prodList[x].quantity = quantity;

                //Removing Edit Flag
                editOn = false;

                //Enabling the SKU input Field
                $("#product_sku").prop('disabled', false);

                //Changing Button Text
                $("#add-Product").html("Add Product");

                //Display Success Function
                successChangeAndDisplay("Update Successful");
                return;         
            }
        }
    }

    //If Doesn't Exist then push onto the Array
    let prod = 
    {
        "SKU": SKU,
        "productName": productName,
        "productPrice": productPrice,
        "quantity": quantity
    };

    // Pushing to the Object Array
    prodList.push(prod);

    //Successful Display Function
    successChangeAndDisplay("Product Added Successfully");
}

//Display Function
function display()
{    
    //Tempororary Variable to Add Rows
    var html = '<tr>\
                    <th>SKU\</th>\
                    <th>Name\</th>\
                    <th>Price\</th>\
                    <th>Quantity\</th>\
                    <th>Action\</th>\
                </tr>';

    //Fetching the rows in Product List Array
    for (var i = 0; i < prodList.length; i++)//let item of prodList)
    {
        html += '<tr>\
            <td>'+prodList[i].SKU+'\</td>\
            <td>'+prodList[i].productName+'\</td>\
            <td>'+prodList[i].productPrice+'\</td>\
            <td>'+prodList[i].quantity+'\</td>\
            <td style="font-size:16px; padding-right: 6px;" class="fa"><a href="#" onclick="editForm('+prodList[i].SKU+')">&#xf040;</a>\</td>\
            <td style="font-size:20px" class="fa"><a href="#" onclick="delForm('+prodList[i].SKU+')">&#xf00d;</a>\</td>\
        </tr>';
    }

    //Adding content to Table
    $("#f-head").html(html);
}

function editForm(id)
{
    for (var i = 0; i < prodList.length; i++)
    {
        if (prodList[i].SKU == id)
        {
            $("#product_sku").val(prodList[i].SKU);
            $("#product_name").val(prodList[i].productName);
            $("#product_price").val(prodList[i].productPrice);
            $("#quantity").val(prodList[i].quantity);
            
            //Disabling the SKU Field
            $("#product_sku").prop("disabled", true);

            //Changing the Button Value
            $("#add-Product").html("Edit Product");

            //Setting the Edit Flag Value
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
        if (prodList[i].SKU == id)
        {
            prodList.splice(i,1);
        }
        i-=1;
    }
    
    //Display Function
    display();

    //Success Message
    successChangeAndDisplay("Entry Deleted Successfully");
}

//Change Error and Display
function errorChangeAndDisplay(e)
{
    $(document).ready(function()
    {
        $('.error').show();
    });
    e += '<a href="#" class="close fa" style="font-size:16px">&#xf00d;</a>';
    $(document).ready(function()
    {
        $('.error').html(e)
    });
}

//Change Success and Display
function successChangeAndDisplay(e)
{
    $(document).ready(function()
    {
        $('.success').show();
    });
    e += '<a href="#" class="close fa" style="font-size:16px">&#xf00d;</a>';
    $(document).ready(function()
    {
        $('.success').html(e)
    });
}