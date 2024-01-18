new WOW().init();
$(".my-form").submit(function (e) {
  e.preventDefault();
  var isDisable = true;
  sessionStorage.setItem("isDisable", isDisable);
});

if (sessionStorage.getItem("isDisable") == "true") {
  $(".my-cv").removeClass("disabled ").addClass("yellow-cl");
  $(".my-login-out").addClass("display-none ");
} else {
  $(".my-cv").addClass("disabled ").removeClass("yellow-cl");
  $(".my-login-out").removeClass("display-none ");
}

//* Đối tượng Validator
function Validator(options) {
  var selectorRules = {};
  //*Hàm thực hiện validate
  function validate(inputElement, rule) {
    var errorElement = inputElement
      .closest(options.formGroupSelector)
      .querySelector(options.errorSelector);
    var errorMessage;
    //todo lấy qua các rule của selector
    var rules = selectorRules[rule.selector];
    //todo Lập qua từng rule & kiểm tra
    for (let i = 0; i < rules.length; ++i) {
      switch (inputElement.type) {
        case "checkbox":
        case "radio":
          errorMessage = rules[i](
            formElements.querySelector(rule.selector + ":checked")
          );
          break;
        default:
          errorMessage = rules[i](inputElement.value); //* input người dùng nhập vào
      }
      if (errorMessage) {
        break;
      }
    }
    if (errorMessage) {
      errorElement.innerText = errorMessage;
      inputElement
        .closest(options.formGroupSelector)
        .classList.add("my-invalid");
    } else {
      errorElement.innerText = "";
      inputElement
        .closest(options.formGroupSelector)
        .classList.remove("my-invalid");
    }
    return !errorMessage; //todo Ép kiểu sang bolen
  }
  var formElements = document.querySelector(options.form);
  if (formElements) {
    //todo Khi submit form
    formElements.onsubmit = function (e) {
      e.preventDefault();
      var isFormValid = true;
      //todo Lập qua từng rule và validate
      options.rules.forEach((rule) => {
        var inputElement = formElements.querySelector(rule.selector);
        var isValid = validate(inputElement, rule);
        if (!isValid) {
          isFormValid = false;
        }
      });
      //todo Nếu không có lỗi
      if (isFormValid) {
        //todo Trường hợp submit với javascript
        if (typeof options.onSubmit === "function") {
          var EnableInputs = formElements.querySelectorAll(
            "[name]:not([disable])"
          );
          //todo Array.form(EnableInputs) chuyển từ node list sang array
          var formValue = Array.from(EnableInputs).reduce(function (
            values,
            input
          ) {
            switch (input.type) {
              case "checked":
              case "radio":
                if (input.checked) {
                  values[input.name] = input.value;
                }

                break;
              case "checkbox":
                if (!input.matches(":checked")) {
                  values[input.name] = "";
                  return values;
                }
                if (!Array.isArray(values[input.name])) {
                  values[input.name] = [];
                }
                values[input.name].push(input.value);
                break;
              case "file":
                values[input.name] = input.files;
                break;
              default:
                values[input.name] = input.value;
            }
            return values;
          },
          {});
          options.onSubmit(formValue);
        } else {
          //todo Trường hợp submit với hành vi mặc định
          formElements.submit();
        }
      }
    };
    //todo Lập qua sự kiện và xử lý ( Lắng nghe sự kiện blur, input,...)
    options.rules.forEach((rule) => {
      //? Khắc phục tình trạng ghi đè
      if (Array.isArray(selectorRules[rule.selector])) {
        selectorRules[rule.selector].push(rule.test); //todo nếu như nó đã là mảng rồi thì push thêm phần tử nửa
      } else {
        selectorRules[rule.selector] = [rule.test]; //*todo Lưu lại các rules cho mỗi ô input dưới dạng mảng
      }
      var inputElements = formElements.querySelectorAll(rule.selector);
      Array.from(inputElements).forEach(function (inputElement) {
        //todo Xử lí trường hợp blur khỏi input
        inputElement.onblur = function () {
          validate(inputElement, rule);
        };
        //todo Xử lí trường người dùng nhập vào input
        inputElement.oninput = function () {
          var errorElement = inputElement
            .closest(options.formGroupSelector)
            .querySelector(options.errorSelector);
          errorElement.innerText = "";
          inputElement
            .closest(options.formGroupSelector)
            .classList.remove("my-invalid");
        };
      });
    });
  }
}

//* Định nghĩa các rules
//todo Nguyên tắc của các rules
//! Nếu có lỗi => return messege Lỗi
//? Nếu hợp lệ => không trả về (undefined)
Validator.isRequired = function (selector, message) {
  return {
    selector: selector,
    test: function (value) {
      return value ? undefined : message || "Vui lòng nhập lại trường này";
      //todo trim() dùng để loại bỏ dấu cách 2 đầu của chuỗi, nếu toàn đấu cách thì xoá hết
    },
  };
};
Validator.isEmail = function (selector, message) {
  return {
    selector: selector,
    test: function (value) {
      var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(value)
        ? undefined
        : message || "Trường này phải là email";
    },
  };
};
Validator.minLength = function (selector, min, message) {
  return {
    selector: selector,
    test: function (value) {
      return value.length >= min
        ? undefined
        : message || `Vui lòng nhập tối thiểu ${min} kí tự`;
    },
  };
};
Validator.isConfirmed = function (selector, getConfirmValue, message) {
  return {
    selector: selector,
    test: function (value) {
      return value === getConfirmValue()
        ? undefined
        : message || "Giá trị nhập lại không chính xác";
    },
  };
};

Validator({
  form: "#my-form-1", //todo Lấy ra id của form
  formGroupSelector: ".my-form-group",
  errorSelector: ".my-form-message",
  rules: [
    Validator.isRequired("#my-fullname", "Vui lòng nhập tên đầy đủ của bạn"),
    Validator.isRequired("#my-email", "Không được bỏ trống Email"),
    Validator.isEmail("#my-email"),
    Validator.minLength("#my-password", 6),
    Validator.isRequired(
      "#my-password_confirmation",
      "Vui lòng nhập lại mật khẩu"
    ),
    Validator.isConfirmed(
      "#my-password_confirmation",
      () => {
        return document.querySelector("#my-form-1 #my-password").value;
      },
      "Mật khẩu nhập lại không chính xác"
    ),
  ],
  onSubmit: function (data) {
    sessionStorage.setItem("dangky", JSON.stringify(data));
    location.reload();
  },
});
Validator({
  form: "#my-form-2", //todo Lấy ra id của form
  formGroupSelector: ".my-form-group",
  errorSelector: ".my-form-message",
  rules: [
    Validator.isRequired("#my-email-2", "Không được bỏ trống Email"),
    Validator.isEmail("#my-email-2"),
    Validator.minLength("#my-password-2", 6),
  ],
  onSubmit: function (data) {
    var dangky = JSON.parse(sessionStorage.getItem("dangky"));
    if (dangky.email === data.email && dangky.password === data.password) {
      location.reload();
      alert("Đăng Nhập Thành Công");
    } else {
      alert("Email Hoặc Mật Khẩu Không Chính Xác");
    }
  },
  onSubmit: function (data) {
    var dangky = JSON.parse(sessionStorage.getItem("dangky"));
    if (dangky.email === data.email && dangky.password === data.password) {
      location.reload();
      alert("Đăng Nhập Thành Công");
    } else {
      alert("Email Hoặc Mật Khẩu Không Chính Xác");
    }
  },
});

$(".form-search").submit(function (e) {
  e.preventDefault();
  var searchValue = {
    province: $(".province").val(),
    job: $(".job").val(),
  };

  if (
    !searchValue.province.includes("Tất cả") &&
    !searchValue.province.includes("TP. Hồ Chí Minh")
  ) {
    window.location = "./kythuat_congnghe.html";
  } else {
    console.log(searchValue.job);
    switch (Number(searchValue.job)) {
      case 0: {
        window.location.href = "./congviec_page1.html";
        break;
      }
      case 1: {
        window.location.href = "./dichvutaichinh.html";
        break;
      }
      case 2: {
        window.location.href = "./truyenthong.html";
        break;
      }
      case 3: {
        window.location.href = "./hangtieudungvabanle.html";
        break;
      }
      case 4: {
        window.location.href = "./khachsanvadulich.html";
        break;
      }
      case 5: {
        window.location.href = "./kythuat_congnghe.html";
        break;
      }
      case 6: {
        window.location.href = "./xaydung.html";
        break;
      }
      case 7: {
        window.location.href = "./vantai.html";
        break;
      }
      case 8: {
        window.location.href = "./dichvu.html";
        break;
      }
      case 9: {
        window.location.href = "./giaodichkhachhang.html";
        break;
      }
      case 10: {
        window.location.href = "./bophanhotro.html";
        break;
      }
      case 11: {
        window.location.href = "./kythuat.html";
        break;
      }
      case 12: {
        window.location.href = "./yte.html";
        break;
      }
      case 13: {
        window.location.href = "./sanxuat.html";
        break;
      }
      case 14: {
        window.location.href = "./hotrosanxuat.html";
        break;
      }
      case 15: {
        window.location.href = "./nhansu.html";
        break;
      }
      case 16: {
        window.location.href = "./kinhdoanh.html";
        break;
      }
      case 17: {
        window.location.href = "./phiendich.html";
        break;
      }
    }
  }
});
// tắt loading
var loading = document.querySelector(".loading");
setTimeout(function () {
  loading.classList.remove("loading");
}, 1000);
//remove class khi srceen dưới 976px
window.addEventListener("resize", function () {
  if (window.screen.width < 976) {
    let show = document.querySelector(".show") || null;
    if (show) {
      show.classList.remove("show");
    }
  }
});
