 /*document.getElementById("contactForm").addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(e.target);
      const params = new URLSearchParams(formData).toString();
      window.location.href = `contact-response1.html?${params}`;
    });*/


    document.getElementById('menuToggle').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('show');
});





   document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const form = e.target;
    if (!form.reportValidity()) return;

    const formData = new FormData(form);
    const data = {
      email: formData.get("email"),
      whatsapp: formData.get("whatsapp"),
      feedback: formData.get("feedback"),
      message: formData.get("message"),
    };

    // Step 1: Send to me
    emailjs.send("service_jrmoldi", "template_zpq3b2a", data)
      .then(() => {
        // Step 2: Send confirmation to user
        emailjs.send("service_planetPal", "template_5bb16mj", {
          user_email: data.email,
          user_name: data.email.split("@")[0], // or add a field for name
          message_summary: data.message
        });
      })
      .finally(() => {
        const params = new URLSearchParams(data).toString();
        window.location.href = `contact-response1.html?${params}`;
      })
      .catch(error => {
        alert("Sending failed. Please try again.");
        console.error(error);
      });
  });