/* eslint-disable */

const hideeeAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};

// type is 'success' or 'error'
const showwwAlert = (type, msg) => {
  hideeeAlert();

  const markup = `<div class= "alert alert--${type}">${msg}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);

  window.setTimeout(hideeeAlert, 5000);
};

const updateData = async (data, type) => {
  const url =
    type == 'data' ? '/api/v1/users/updateMe' : '/api/v1/users/updatePassword';

  try {
    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });

    showwwAlert('success', `${type.toUpperCase()} updated successfully!`);
    window.setTimeout(() => {
      location.assign('/me');
    }, 500);
  } catch (err) {
    showwwAlert('error', err.response.data.message);
  }
};

const updateDataForm = document.querySelector('.form-user-data');
const updatePasswordForm = document.querySelector('.form-user-password');

if (updateDataForm) {
  updateDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);

    updateData(form, 'data');
  });
}

if (updatePasswordForm) {
  updatePasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const oldPassword = document.getElementById('password-current').value;
    const newPassword = document.getElementById('password').value;
    const newPasswordConfirm =
      document.getElementById('password-confirm').value;
    updateData({ oldPassword, newPassword, newPasswordConfirm }, 'password');
  });
}
