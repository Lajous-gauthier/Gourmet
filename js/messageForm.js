
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');


contactForm.addEventListener('submit', function(e) {
   
    e.preventDefault();
    
   
    const formData = {
        nom: document.getElementById('name').value,
        email: document.getElementById('email').value,
        sujet: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
 
    console.log('Données du formulaire:', formData);
    
   
    successMessage.style.display = 'block';
    
   
    contactForm.reset();
    
   
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 3000);
    
    let messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.push({
        ...formData,
        date: new Date().toISOString()
    });
    localStorage.setItem('messages', JSON.stringify(messages));
});