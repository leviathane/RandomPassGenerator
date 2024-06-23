const passwordOutput = document.getElementById('passwordOutput');
const passwordStrength = document.getElementById('passwordStrength');
const lengthSlider = document.getElementById('lengthSlider');
const lengthValue = document.getElementById('lengthValue');
const uppercaseCheckbox = document.getElementById('uppercase');
const lowercaseCheckbox = document.getElementById('lowercase');
const numbersCheckbox = document.getElementById('numbers');
const symbolsCheckbox = document.getElementById('symbols');

function generatePassword() {
    const length = lengthSlider.value;
    lengthValue.textContent = length;

    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    let allChars = '';
    if (uppercaseCheckbox.checked) allChars += uppercaseChars;
    if (lowercaseCheckbox.checked) allChars += lowercaseChars;
    if (numbersCheckbox.checked) allChars += numberChars;
    if (symbolsCheckbox.checked) allChars += symbolChars;

    if (allChars === '') {
        passwordOutput.value = '';
        passwordStrength.textContent = 'Invalid';
        return;
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        password += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }

    passwordOutput.value = password;
    updateStrength(password);
}

function updateStrength(password) {
    let strength = 'Weak';
    const regexStrong = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\\-\\=\\[\\]\\{}|;:,.<>?])(?=.{12,})');
    const regexMedium = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\\-\\=\\[\\]\\{}|;:,.<>?])(?=.{8,})');
    if (regexStrong.test(password)) {
        strength = 'Very strong';
    } else if (regexMedium.test(password)) {
        strength = 'Strong';
    } else if (password.length >= 6) {
        strength = 'Medium';
    }
    passwordStrength.textContent = strength;
}

function copyPassword() {
    passwordOutput.select();
    document.execCommand('copy');

    const copyButton = document.querySelector('.copy-button');
    copyButton.textContent = 'Copied';

    setTimeout(() => {
        copyButton.textContent = 'Copy';
    }, 2000);
}


lengthSlider.addEventListener('input', generatePassword);
uppercaseCheckbox.addEventListener('change', generatePassword);
lowercaseCheckbox.addEventListener('change', generatePassword);
numbersCheckbox.addEventListener('change', generatePassword);
symbolsCheckbox.addEventListener('change', generatePassword);

generatePassword();
