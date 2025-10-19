
document.addEventListener('DOMContentLoaded', function () {
    const cityInput = document.getElementById('sender_city');
    const dynamicCity = document.getElementById('dynamic-city');
    const dateInput = document.getElementById('date');
    const btn = document.querySelector('button');

    cityInput.addEventListener('input', function () {
        dynamicCity.textContent = cityInput.value || 'Absenderstadt';
    });

    const currentDate = new Date().toLocaleDateString('de-DE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    dateInput.value = currentDate;

    btn.addEventListener('click', function () {
        const doc = new jsPDF();

        const senderName = document.getElementById('sender_name').value;
        const city = cityInput.value;
        const date = dateInput.value;

        let y = 20;
        doc.setFontSize(12);
        doc.text(senderName, 20, y);
        y += 10;
        doc.text(city + ', den ' + date, 150, y, { align: 'right' });
        y += 10;
        doc.text(document.querySelector('input[placeholder=Betreff]').value, 20, y);
        y += 10;
        doc.text(document.querySelector('input[placeholder=Anrede]').value, 20, y);
        y += 10;
        const body = document.querySelector('textarea').value.split('\n');
        body.forEach(line => {
            doc.text(line, 20, y);
            y += 10;
        });
        y += 10;
        doc.text(document.querySelector('input[placeholder=Abschiedsformel]').value, 20, y);
        y += 10;
        doc.text(document.querySelector('input[placeholder="Name Absender"]').value, 20, y);

        doc.save('DinBrief.pdf');
    });
});
