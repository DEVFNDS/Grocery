const deliveryOption = document.getElementById("delivery-option");
      const pickupOption = document.getElementById("pickup-option");
      const deliveryAccordion = document.getElementById("delivery-accordion");
      const pickupAccordion = document.getElementById("pickup-accordion");
      const placeOrderButton = document.getElementById("place-order-button");
      const accordionHeader = document.querySelectorAll(".accordion-header");
      const accordionContent = document.querySelector(".accordion-content");
      const mobileInput = document.getElementById("mobile-number");
      const mobileError = document.getElementById("mobile-error");
      const countryCodeSelect = document.getElementById("country-code");
      const popupOverlay = document.querySelector("#pop-up-new");
      const popupHeader = popupOverlay.querySelector(".popup-header");

      const popupAddress = document.getElementById("overlay-address");
      const closePopup = document.querySelector(".close-popup");
      const countryList = ["USA", "Canada"]; // list
      const deliveryAddress = document.getElementById("delivery-address");
      const deliveryAddressError = document.getElementById(
        "delivery-address-error"
      );
      const streetName = document.getElementById("street-name");
      const streetNameError = document.getElementById("street-name-error");
      const postalCode = document.getElementById("postal-code");
      const postalCodeError = document.getElementById("postal-code-error");
      const country = document.getElementById("country");
      const countryError = document.getElementById("country-error");
      const cardName = document.getElementById("card-name");
      const cardNumber = document.getElementById("card-number");
      const cardNameError = document.getElementById("cardname-error");
      const cardNumError = document.getElementById("cardnum-error");
      const cardExpError = document.getElementById("exp-error");
      const cardCvvError = document.getElementById("cvv-error");
      const cardExpiry = document.getElementById("card-expiry");
      const cardCvv = document.getElementById("card-cvv");
      const pickupMob = document.getElementById("pickup-mobile-number");
      const pickMobError = document.getElementById("pickup-mobile-error");
      const cardNumberPickUp = document.getElementById("pick-up-card-number");
      const cardNumErrorPickUp = document.getElementById(
        "pick-up-cardnum-error"
      );
      const cardExpiryPickUp = document.getElementById("pick-up-card-expiry");
      const cardExpErrorPickUp = document.getElementById("pick-up-exp-error");
      const cardCvvPickUp = document.getElementById("pick-up-card-cvv");
      const cardCvvErrorPickUp = document.getElementById("pick-up-cvv-error");
      const cardNamePickUp = document.getElementById("pick-up-card-name");
      const cardNameErrorPickUp = document.getElementById(
        "pick-up-cardname-error"
      );

      const addressRegex = /^[a-zA-Z0-9\s,'-]*$/;
      const streetRegex = /^[a-zA-Z0-9\s,'-]*$/;

      placeOrderButton.disabled = true;
      /*delivery validation starts here*/

      deliveryAddress.onblur = validateDeliveryAddress;
      streetName.onblur = validateStreetName;
      postalCode.onblur = validatePostalCode;
      mobileInput.onblur = validateMobileNumber;
      country.onblur = validateCountry;
      cardName.onblur = validateCardName;
      cardNumber.onblur = validateCardNumber;
      cardExpiry.onblur = validateCardExp;
      cardCvv.onblur = validateCardCvv;

      function validateCardNumber() {
        const regexCardNum = /^[0-9]{16}$/;
        if (!cardNumber.value) {
          cardNumError.textContent = "Card Number is required.";
          cardNumError.style.color = "red";
          cardNumError.style.display = "block";
        } else if (!regexCardNum.test(cardNumber.value)) {
          cardNumError.innerHTML = "Please enter a valid card number.";
        } else {
          cardNumError.innerHTML = "";
        }
        checkAllFieldsValid();
      }

      function validateCardExp() {
        // Regular expression for expiry date validation
        const regexExp = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
        if (!cardExpiry.value) {
          cardExpError.textContent = "Card Expiry date is required.";
          cardExpError.style.color = "red";
          cardExpError.style.display = "block";
        } else if (!regexExp.test(cardExpiry.value)) {
          cardExpError.innerHTML = "Please enter a valid card expiry date.";
        } else {
          cardExpError.innerHTML = "";
        }
        checkAllFieldsValid();
      }

      function validateCardCvv(cvv) {
        // Regular expression for CVV validation
        const regexCvv = /^[0-9]{3}$/;
        if (!cardCvv.value) {
          cardCvvError.textContent = "Card CVV is required.";
          cardCvvError.style.color = "red";
          cardCvvError.style.display = "block";
        } else if (!regexCvv.test(cardCvv.value)) {
          cardCvvError.innerHTML = "Please enter a valid  CVV";
        } else {
          cardCvvError.innerHTML = "";
        }
        checkAllFieldsValid();
      }

      function validateCardName() {
        const regexCardName = /^[a-zA-Z ]{2,30}$/;
        if (!cardName.value) {
          cardNameError.textContent = "Card Name is required.";
          cardNameError.style.color = "red";
          cardNameError.style.display = "block";
        } else if (!regexCardName.test(cardName.value)) {
          cardNameError.innerHTML = "Please enter a valid cardholder name.";
        } else {
          cardNameError.innerHTML = "";
        }
        checkAllFieldsValid();
      }

      function validateCountry() {
        if (!country.value) {
          countryError.textContent = "Country is required.";
          countryError.style.color = "red";
          countryError.style.display = "block";
        } else {
          countryError.textContent = "";
        }
        checkAllFieldsValid();
      }

      function validateMobileNumber() {
        const mobileNumber = mobileInput.value.trim();
        const countryCode = countryCodeSelect.value;
        if (!mobileNumber) {
          mobileError.textContent = "Mobile number is required";
          mobileError.style.color = "red";
          mobileError.style.display = "block";
          checkAllFieldsValid();
          return;
        }
        const regexMobile = /^(\d{10})$/;
        if (!regexMobile.test(mobileNumber)) {
          mobileError.innerHTML = "Please enter a valid mobile number.";
          checkAllFieldsValid();
        } else {
          mobileError.innerHTML = "";
        }
        checkAllFieldsValid();
      }

      function validatePostalCode() {
        const postalCodeRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
        if (postalCode.validity.valueMissing) {
          postalCodeError.textContent = "Postal code is required.";
          postalCodeError.style.color = "red";
          postalCodeError.style.display = "block";
        } else if (!postalCodeRegex.test(postalCode.value)) {
          postalCodeError.textContent = "Invalid postal code.";
          postalCodeError.style.color = "red";
          postalCodeError.style.display = "block";
        } else if (postalCode.value.length > 7) {
          postalCodeError.textContent =
            "Postal code should be 7 characters or less.";
          postalCodeError.style.color = "red";
          postalCodeError.style.display = "block";
        } else {
          postalCodeError.textContent = "";
        }
        checkAllFieldsValid();
      }

      function validateStreetName() {
        const regexStreetName = /^[a-zA-Z0-9 ]{3,50}$/;
        if (!streetName.value) {
          streetNameError.textContent = "Street name is required.";
          streetNameError.style.color = "red";
          streetNameError.style.display = "block";
        } else if (!regexStreetName.test(streetName.value)) {
          streetNameError.innerHTML = "Please enter a valid street name.";
        } else {
          streetNameError.innerHTML = "";
        }
        checkAllFieldsValid();
      }

      function validateDeliveryAddress() {
        const regexDeliveryAddress = /^[a-zA-Z0-9- ]{3,50}$/;
        if (!deliveryAddress.value) {
          deliveryAddressError.textContent = "Delivery address is required.";
          deliveryAddressError.style.color = "red";
          deliveryAddressError.style.display = "block";
        } else if (!regexDeliveryAddress.test(deliveryAddress.value)) {
          deliveryAddressError.innerHTML =
            "Please enter a valid delivery address.";
        } else {
          deliveryAddressError.innerHTML = "";
        }
        checkAllFieldsValid();
      }

      function checkAllFieldsValid() {
        // Check if all required fields have a value
        const requiredFields = [
          deliveryAddress,
          streetName,
          postalCode,
          mobileInput,
          country,
          cardName,
          cardNumber,
          cardExpiry,
          cardCvv,
        ];
        const allFieldsValid = requiredFields.every(
          (field) => field.value.trim() !== ""
        );

        // Check if any error fields have a value
        const errorFields = [
          deliveryAddressError,
          streetNameError,
          postalCodeError,
          mobileError,
          countryError,
          cardNameError,
          cardNumError,
          cardExpError,
          cardCvvError,
        ];
        const anyErrorFields = errorFields.some(
          (field) => field.innerHTML !== ""
        );

        // Enable or disable the place order button based on the validation
        if (allFieldsValid && !anyErrorFields) {
          placeOrderButton.disabled = false;
        } else {
          placeOrderButton.disabled = true;
        }
      }

      /*picup validation starts here*/
      cardNumberPickUp.onblur = validateCardNumberPickUp;
      cardExpiryPickUp.onblur = validateCardExpPickUp;
      cardCvvPickUp.onblur = validateCardCvvPickUp;
      cardNamePickUp.onblur = validateCardNamePickUp;
      pickupMob.onblur = validatePickMobileNumber;
      function validateCardNumberPickUp() {
        const regexCardNum = /^[0-9]{16}$/;
        if (!cardNumberPickUp.value) {
          cardNumErrorPickUp.textContent = "Card Number is required.";
          cardNumErrorPickUp.style.color = "red";
          cardNumErrorPickUp.style.display = "block";
        } else if (!regexCardNum.test(cardNumberPickUp.value)) {
          cardNumErrorPickUp.innerHTML = "Please enter a valid card number.";
        } else {
          cardNumErrorPickUp.innerHTML = "";
        }
        checkAllFieldsValidPickUp();
      }

      function validateCardExpPickUp() {
        // Regular expression for expiry date validation
        const regexExp = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
        if (!cardExpiryPickUp.value) {
          cardExpErrorPickUp.textContent = "Card Expiry date is required.";
          cardExpErrorPickUp.style.color = "red";
          cardExpErrorPickUp.style.display = "block";
        } else if (!regexExp.test(cardExpiryPickUp.value)) {
          cardExpErrorPickUp.innerHTML =
            "Please enter a valid card expiry date.";
        } else {
          cardExpErrorPickUp.innerHTML = "";
        }
        checkAllFieldsValidPickUp();
      }

      function validateCardCvvPickUp(cvv) {
        // Regular expression for CVV validation
        const regexCvv = /^[0-9]{3}$/;
        if (!cardCvvPickUp.value) {
          cardCvvErrorPickUp.textContent = "Card CVV is required.";
          cardCvvErrorPickUp.style.color = "red";
          cardCvvErrorPickUp.style.display = "block";
        } else if (!regexCvv.test(cardCvvPickUp.value)) {
          cardCvvErrorPickUp.innerHTML = "Please enter a valid  CVV";
        } else {
          cardCvvErrorPickUp.innerHTML = "";
        }
        checkAllFieldsValidPickUp();
      }

      function validateCardNamePickUp() {
        const regexCardName = /^[a-zA-Z ]{2,30}$/;
        if (!cardNamePickUp.value) {
          cardNameErrorPickUp.textContent = "Card Name is required.";
          cardNameErrorPickUp.style.color = "red";
          cardNameErrorPickUp.style.display = "block";
        } else if (!regexCardName.test(cardNamePickUp.value)) {
          cardNameErrorPickUp.innerHTML =
            "Please enter a valid cardholder name.";
        } else {
          cardNameErrorPickUp.innerHTML = "";
        }
        checkAllFieldsValidPickUp();
      }
      function validatePickMobileNumber() {
        const piMoNum = pickupMob.value.trim();
        const countryCode = countryCodeSelect.value;
        if (!piMoNum) {
          pickMobError.textContent = "Mobile number is required";
          pickMobError.style.color = "red";
          pickMobError.style.display = "block";
          checkAllFieldsValidPickUp();
          return;
        }
        const regexMobile = /^(\d{10})$/;
        if (!regexMobile.test(piMoNum)) {
          pickMobError.innerHTML = "Please enter a valid mobile number.";
          checkAllFieldsValidPickUp();
        } else {
          pickMobError.innerHTML = "";
        }
        checkAllFieldsValidPickUp();
      }
      function checkAllFieldsValidPickUp() {
        const requiredFields = [
          pickupMob,

          cardNamePickUp,
          cardNumberPickUp,
          cardExpiryPickUp,
          cardCvvPickUp,
        ];
        const allFieldsValidPickup = requiredFields.every(
          (field) => field.value.trim() !== ""
        );

        // Check if any error fields have a value
        const errorFields = [
          cardNameErrorPickUp,
          cardNumErrorPickUp,
          cardExpErrorPickUp,
          cardCvvErrorPickUp,
          pickMobError,
        ];
        const anyErrorFieldsPickup = errorFields.some(
          (field) => field.innerHTML !== ""
        );

        // Enable or disable the place order button based on the validation
        if (allFieldsValidPickup && !anyErrorFieldsPickup) {
          placeOrderButton.disabled = false;
        } else {
          placeOrderButton.disabled = true;
        }
      }

      // Show delivery accordion by default
      deliveryOption.classList.add("active");
      deliveryAccordion.classList.add("active");

      accordionHeader.forEach((header) => {
        header.addEventListener("click", () => {
          const accordionContent = header.nextElementSibling;

          // Check if the clicked header is already active
          if (header.classList.contains("active")) {
            // Close the accordion content and remove the active class
            header.classList.remove("active");
            accordionContent.style.display = "none";
          } else {
            // Close all the accordion contents
            accordionHeader.forEach((header) => {
              header.classList.remove("active");
              const accordionContent = header.nextElementSibling;
              accordionContent.style.display = "none";
            });

            // Toggle the 'active' class on the clicked header
            header.classList.add("active");

            // Open the clicked accordion content
            accordionContent.style.display = "block";
          }
        });
      });

      // Toggle active option and accordion
      deliveryOption.addEventListener("click", () => {
        deliveryOption.classList.add("active");
        pickupOption.classList.remove("active");
        deliveryAccordion.classList.add("active");
        pickupAccordion.classList.remove("active");
      });

      pickupOption.addEventListener("click", () => {
        deliveryOption.classList.remove("active");
        pickupOption.classList.add("active");
        deliveryAccordion.classList.remove("active");
        pickupAccordion.classList.add("active");
      });

      // Get current time
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const amOrPm = hours >= 12 ? "PM" : "AM";
      const twelveHourFormatHours = hours % 12 || 12;
      const currentTime = `${twelveHourFormatHours}:${minutes} ${amOrPm}`;

      // Calculate priority and standard times
      const priorityMinutes = (minutes + 20) % 60; // Add 20 minutes and wrap around to 0-59 range
      const priorityHours =
        twelveHourFormatHours + Math.floor((minutes + 20) / 60); // Add extra hour if necessary
      const priorityAmOrPm = priorityHours >= 12 ? "PM" : "AM"; // Determine AM/PM for priority time
      const twelveHourFormatPriorityHours = priorityHours % 12 || 12; // Convert to 12-hour format
      const priorityTime = `${twelveHourFormatPriorityHours}:${priorityMinutes} ${priorityAmOrPm}`;
      // Update placeholder text of delivery time input
      const deliveryTimeInput = document.getElementById("delivery-time");
      deliveryTimeInput.placeholder = `${priorityTime}`;

      const standardMinutes = (minutes + 30) % 60; // Add 30 minutes and wrap around to 0-59 range
      const standardHours =
        twelveHourFormatHours + Math.floor((minutes + 30) / 60); // Add extra hour if necessary
      const standardAmOrPm = standardHours >= 12 ? "PM" : "AM"; // Determine AM/PM for standard time
      const twelveHourFormatStandardHours = standardHours % 12 || 12; // Convert to 12-hour format
      const standardTime = `${twelveHourFormatStandardHours}:${standardMinutes} ${standardAmOrPm}`;

      // Update delivery times for priority and standard options
      document.getElementById("priority-time").textContent = priorityTime;
      document.getElementById("standard-time").textContent = standardTime;

      // Add click event listener to delivery time header to toggle accordion
      const deliveryTimeHeader = document.querySelector(
        ".delivery-time-header"
      );
      const deliveryTimeContent = document.querySelector(".accordion-content");

      // Add change event listener to delivery time options
      const deliveryTimeOptions = document.querySelectorAll(
        'input[type="radio"][name="delivery-time-option"]'
      );

      deliveryTimeOptions.forEach(function (option) {
        option.addEventListener("change", function () {
          const selectedOption = this.value;
          const deliveryTimeInput = document.getElementById("delivery-time");

          switch (selectedOption) {
            case "priority":
              deliveryTimeInput.value = priorityTime;
              break;
            case "standard":
              deliveryTimeInput.value = standardTime;
              break;
            case "two-hour-window":
              deliveryTimeInput.value = "Within 2 hours";
              break;
            case "three-hour-window":
              deliveryTimeInput.value = "Within 3 hours";
              break;
            default:
              break;
          }
        });
      });
      placeOrderButton.addEventListener("click", () => {
        // Display the popup overlay
        popupOverlay.style.display = "block";

        // Close the popup when the close button is clicked
        const closePopupBtn = popupOverlay.querySelector(".close-popup");
        closePopupBtn.addEventListener("click", () => {
          popupOverlay.style.display = "none";
        });
      });


function getData(){
  var cart = document.querySelector(".cart-items")
  var data = localStorage.getItem('data')
  console.log(data)
  cart.innerHTML = data;

  // setting up the cost data
  document.getElementById('cost').innerHTML = localStorage.getItem("amount");
  document.getElementById('final-price').innerHTML = parseFloat(localStorage.getItem("amount")) + 5;
}