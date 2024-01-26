function showTime() {
    var now = new Date();
    var saat = now.getHours();
    var dakika = now.getMinutes();
    var saniye = now.getSeconds();
    var gunler = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
    var gun = gunler[now.getDay()];

    // Saat, dakika ve saniyeyi düzenler
    saat = (saat < 10) ? '0' + saat : saat;
    dakika = (dakika < 10) ? '0' + dakika : dakika;
    saniye = (saniye < 10) ? '0' + saniye : saniye;

    // Sayfa üzerindeki myClock div'ine güncel saat ve günü yazar
    document.getElementById('myClock').innerText = `${saat}:${dakika}:${saniye} - ${gun}`;

    // 1 saniye sonra tekrar günceller
    setTimeout(showTime, 1000);
  }

  // Sayfa yüklendiğinde saat ve günü başlatır
  window.onload = function() {
    showTime();
  };