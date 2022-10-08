const inputState = document.querySelectorAll('.input__state');
const dropdown = document.getElementById('dropdown');
const modalProduct = document.querySelector('.modal__product');
const firstToggler = document.querySelector('[data-100]');
const secondToggler = document.querySelector('[data-200]');

// Modal

(function() {
  const close = document.getElementById('modal-close');
  const modal = document.getElementById('modal');
  const modalOpen = document.getElementById('modal-open');

  if (!close || !modalOpen || !modal) {
    return;
  }

  modalOpen.addEventListener('click', () => {
    modal.style.display = 'block';
    document.body.overflow = 'hidden';
  });

  close.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.overflow = 'initial';
    resetForm();
  });
})();

// Dropdown

(function() {
  dropdown.addEventListener('click', () => {
    dropdown.classList.toggle('active');
  });

  document.addEventListener('click', event => {
    if (event.target.classList.contains('dropdown__list-item')) {
      dropdown.value = event.target.dataset.value;
      dropdown.innerHTML = event.target.innerHTML;
      dropdown.classList.toggle('active');

      totalPrice();
    }
  });
})();

// Togglers

(function() {
  firstToggler.addEventListener('change', () => {
    firstToggler.checked ? (firstToggler.value = 100) : (firstToggler.value = 0);
    totalPrice();
  });

  secondToggler.addEventListener('change', () => {
    secondToggler.checked ? (secondToggler.value = 200) : (secondToggler.value = 0);
    totalPrice();
  });
})();

function totalPrice() {
  let dropdownValue = Number(dropdown.value);
  let firstTogglerValue = Number(firstToggler.value);
  let secondTogglerValue = Number(secondToggler.value);

  document.getElementById('total').value = `${dropdownValue +
    firstTogglerValue +
    secondTogglerValue}`;
}

function isEmpty() {
  inputState.forEach(item => {
    if (!item.value) {
      item.closest('.input').classList.add('error');
    } else validationValues(item);

    if (!dropdown.value) {
      modalProduct.classList.add('error');
    } else return;
  });
}

function validationValues(item) {}

document.getElementById('submit').addEventListener('click', isEmpty);

function validateEmail(email) {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function resetForm() {
  document.getElementById('form').reset();
  if (document.querySelectorAll('.error')) {
    document.querySelectorAll('.error').forEach(item => item.classList.remove('error'));
  }

  //console.log(document.querySelectorAll('.error'));
  // inputState.forEach(item => {
  //   !item.value ? item.closest('.input').classList.remove('error') : (item.value = '');
  // });

  // if (!dropdown.value) {
  //   modalProduct.classList.remove('error');
  // } else {
  //   dropdown.value = '';
  // }
}
