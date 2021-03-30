let products = [];
      $(document).ready(run)

      $(document).on('click', ".add1btn", addRemoveItem);

      $(document).on('click', "#finnishBtn", validateForm)

      function run(){
        products = JSON.parse(localStorage.getItem("cartItems"));
        addItemsToCart();
      }

      function addItemsToCart(){
        $("#cart").empty();
        let totalSum = 0;
        let output = "";
        let counter = 1;

        if(products!=null){

          products.forEach((e)  => {
              let price = e.price;
              let qty = e.qty;
              let totalPrice = price*qty;
              totalSum += totalPrice;
            output = 
            `<tr>
              <th scope="row" class="tableclass">${counter}</th>
              <td>
                <img src=${e.image} class = "pic" alt = Placeholder image class="m-3 pic">
              </td>
              <td class="title">${e.title}</td>
              <td>${price.toFixed(2)}kr</td>
              <td><button type="button" class="btn btn-outline-dark add1btn" style = "padding: 0 4px" >-</button></td>
              <td id = "qty">${qty}</td>
              <td><button type="button" class="btn btn-outline-dark add1btn" style = "padding: 0 4px" >+</button></td>
              <td >${totalPrice.toFixed(2)}kr</td>
            </tr>`

            $("#cart").append(output);
            counter++

          })
          $("#totalTotal").text(totalSum.toFixed(2)+"kr");
        }
        else{
          $("#infoForm").hide();
        }
      }

      function findItem(title){
        let item = null;
        products.forEach((e) => {
          if(e.title == title)
            item = e;
        })
        return item;
      }

      function addRemoveItem(){
        let temp = parseInt($(this).parent().siblings("#qty").html());
        let title = $(this).parent().siblings(".title").html();
        let item = findItem(title);
        
        if($(this).text()=="-" && temp>0){
          item.qty -= 1;        
        }
        else if($(this).text()=="+"){
          item.qty += 1;
        }
        
        localStorage.setItem("cartItems", JSON.stringify(products));
        addItemsToCart();
      }
      
      function validateForm(){
        let firstName = $("#firstName").val();
        let lastName = $("#lastName").val();
        let email = $("#email").val();
        let phone = $("#phone").val();
        let street = $("#street").val();
        let zipCode = $("#zipCode").val();
        let city = $("#com").val();

        let validFname = /^[a-zA-ZåäöÅÄÖ]+$/g
        let validLname = /^[a-zA-ZåäöÅÄÖ]+$/g
        let validzip = /[0-9]{5}/g
        let validMail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let validPhone = /[0-9]{9,10}/g;
        let validStreet = /^[a-zA-ZåäöÅÄÖ]+\s+\d{1,3}/g;
        let validCom = /^[a-zA-ZåäöÅÄÖ]+$/g

        let isValid =  true;

        if(firstName.length>0 && validFname.test(firstName)) {
          $("#invalidFname").html("");
          console.log("rätt förnamn")
        }
        else{
          $("#invalidFname").html("Fel förnamn");
          isValid = false;
          console.log("fel förnamn")
        }
        if(lastName.length>0 && validLname.test(lastName)) {
          $("#invalidLname").html("");
          console.log("rätt förnamn")
        }
        else{
          console.log("fel efternamn")
          isValid = false;
          $("#invalidLname").html("Fel efternamn");
        }
        if(email.length>=5 && validMail.test(email.toLowerCase())) {
          $("#invalidEmail").html("");
          console.log("rätt email")
        }
        else{
          $("#invalidEmail").html("Fel emailadress");
          isValid = false;
          console.log("fel email")
        }
        if(phone.length>=9 && phone.length <=10 && validPhone.test(phone)) {
          $("#invalidPhone").html("");
          console.log("rätt telefon")
        }
        else{
          $("#invalidPhone").html("Fel telefonnummer");
          isValid = false;
          console.log("fel telefon")
        }
        if(street.length>6 && validStreet.test(street)) {
          $("#invalidAdress").html("");
          console.log("rätt gatuadress")
        }
        else{
          $("#invalidAdress").html("Fel gatunamn");
          isValid = false;
          console.log("fel gatuadress")
        }
        if(zipCode.length==5 && validzip.test(zipCode)) {
          $("#invalidZip").html("");
          console.log("rätt postnr")
        }
        else{
          $("#invalidZip").html("Fel postnummer");
          isValid = false;
          console.log("fel postnr")
        }
        if(city.length>2 && validCom.test(city)) {
          $("#invalidCom").html("");
          console.log("rätt ort")
        }
        else{
          $("#invalidCom").html("Fel ort");
          isValid = false;
          console.log("fel ort")
        }

        console.log(isValid);

        if(isValid){
          $("#page").load("endpage.html")
        }

      }
      