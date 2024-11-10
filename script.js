document.addEventListener("DOMContentLoaded", () => {
  const headerTextElements = document.querySelectorAll('.headerText');
  const customButtonElements = document.querySelectorAll('.custom-button');
  const cardElements = document.querySelectorAll('.card');
  const videoBackground = document.querySelector('.background');
  const videoPlaceholder = document.getElementById('aboutPlaceholder');

  headerTextElements.forEach((element) => {
    element.addEventListener('mouseover', () => {
      element.style.borderBottom = '5px solid #FFCC00';
      element.style.cursor = 'pointer';
    });
    element.addEventListener('mouseout', () => {
      element.style.borderBottom = 'none';
      element.style.cursor = 'default';
    });
  });

  customButtonElements.forEach((button) => {
    const imgInButton = button.querySelector('img');

    button.addEventListener('mouseover', () => {
      button.style.setProperty('background-color', 'black', 'important');
      button.style.setProperty('color', 'white', 'important');
      if (imgInButton) imgInButton.style.filter = 'invert(1)';
    });
    button.addEventListener('mouseout', () => {
      button.style.setProperty('background-color', 'var(--nikon-yellow)', 'important');
      button.style.setProperty('color', 'black', 'important');
      if (imgInButton) imgInButton.style.filter = 'none';
    });
  });

  cardElements.forEach((card) => {
    const buttonInCard = card.querySelector('.btn-view-courses');

    card.addEventListener('mouseover', () => {
      card.style.setProperty('background-color', 'var(--nikon-yellow)');
      card.style.transition = 'transform 0.3s ease';
      if (buttonInCard) {
        buttonInCard.style.setProperty('background-color', 'black', 'important');
        buttonInCard.style.setProperty('color', 'white', 'important');
        
        const imgInButton = buttonInCard.querySelector('img');
        if (imgInButton) imgInButton.style.filter = 'invert(1)';
      }
    });

    card.addEventListener('mouseout', () => {
      card.style.setProperty('background-color', 'white');
      if (buttonInCard) {
        buttonInCard.style.setProperty('background-color', 'white', 'important');
        buttonInCard.style.setProperty('color', 'black', 'important');

        // Reset the image inside the button
        const imgInButton = buttonInCard.querySelector('img');
        if (imgInButton) imgInButton.style.filter = 'none';
      }
    });
  });

  videoPlaceholder.addEventListener('mouseover', () => {
    videoBackground.style.transform = 'translateX(60px)';
    videoBackground.style.transition = 'transform 0.3s ease';
  });
  
  videoPlaceholder.addEventListener('mouseout', () => {
    videoBackground.style.transform = 'translateX(0px)';
  });
});

const loginAlertPlaceholder = document.getElementById('loginErrorPlaceholder');
const appendAlert = (message, type) => {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = [
    `<div id="loginAlert" class="alert alert-${type} alert-dismissible fade show" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('');
  loginAlertPlaceholder.append(wrapper);
};

const loginAlertTrigger = document.getElementById('loginButton');
if (loginAlertTrigger) {
  loginAlertTrigger.addEventListener('click', (event) => {
    event.preventDefault();

    const userName = document.getElementById('userName').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!userName || !password) {
      appendAlert('Please enter both a username and password', 'warning');
    } else {
      const loginForm = document.querySelector('form');
      loginForm.submit();
    }
  });
}

