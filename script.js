<script>
        document.addEventListener('DOMContentLoaded', function() {
            // HTML elemanlarını seçiyoruz (ID'leri veya class'ları ile)
            const mainMessage = document.getElementById('main-message');
            const secondaryMessage = document.getElementById('secondary-message');
            const countdownSection = document.getElementById('countdown-section');
            const revealButton = document.getElementById('reveal-button');
            const surpriseContent = document.getElementById('surprise-content');
            const offerQuestion = document.querySelector('.offer-question');
            const yesButton = document.getElementById('yes-button');
            const noButton = document.getElementById('no-button');
            const yesResponse = document.getElementById('yes-response');
            const noResponse = document.getElementById('no-response');

            // Geri sayım birimlerinin span elemanları
            const daysSpan = document.getElementById('days');
            const hoursSpan = document.getElementById('hours');
            const minutesSpan = document.getElementById('minutes');
            const secondsSpan = document.getElementById('seconds');

            // --- ÖNEMLİ AYARLAMALAR (BU KISIMLARI KENDİ BİLGİLERİNİZE GÖRE DÜZENLEYİN!) ---

            // Hedef tarih ve saat: Sürprizin ne zaman ortaya çıkmasını istiyorsun?
            // Şu anki tarih: 19 Haziran 2025, Perşembe, 21:32:01 +03 (Türkiye Saati)
            const targetDate = new Date(); // Şu anki zamanla başlatıyoruz

            // Örneğin, 27 Haziran 2025, saat 18:00'e ayarlayalım
            // DİKKAT: Ay değerleri 0'dan başlar (Ocak=0, Şubat=1, ..., Aralık=11)
            targetDate.setFullYear(2025);   // Yılı ayarla (2025)
            targetDate.setMonth(5);         // Ayı ayarla (Haziran = 5)
            targetDate.setDate(27);         // Günü ayarla (27)
            targetDate.setHours(18);        // Saati ayarla (18:00)
            targetDate.setMinutes(0);       // Dakikayı ayarla (0)
            targetDate.setSeconds(0);       // Saniyeyi ayarla (0)
            targetDate.setMilliseconds(0);  // Milisaniyeyi sıfırla

            // Teklif edeceğin kişinin ve senin adın
            const girlName = "Ayşe"; // Buraya kahve teklif edeceğin kişinin **adını** yaz!
            const yourName = "Can";  // Buraya **kendi** adını yaz!

            // HTML içeriğindeki isimleri dinamik olarak güncelle
            document.querySelector('.offer-text').innerHTML = `Sevgili ${girlName},`;
            document.querySelector('.signature').innerHTML = `Seni düşünen, ${yourName}`;

            // Geri sayım için kullanacağımız interval değişkeni
            let countdownInterval;

            // Geri sayımı güncelleyen fonksiyon
            function updateCountdown() {
                const now = new Date().getTime(); // Şu anki zamanı milisaniye cinsinden al
                const distance = targetDate.getTime() - now; // Hedef zamana kalan süreyi hesapla

                // Zaman bittiyse (kalan süre 0'dan küçükse)
                if (distance < 0) {
                    clearInterval(countdownInterval); // Geri sayımı durdur
                    countdownSection.style.display = 'none'; // Geri sayım bölümünü gizle
                    revealButton.style.display = 'block'; // "Sürprizi Gör" butonunu göster
                    mainMessage.textContent = "Sürpriz Hazır!"; // Ana mesajı değiştir
                    secondaryMessage.textContent = "Hadi ortaya çıkaralım!"; // Alt mesajı değiştir
                    return; // Fonksiyondan çık
                }

                // Kalan zamanı gün, saat, dakika ve saniye olarak hesapla
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                // Hesaplanan değerleri HTML elemanlarına yazdır (Tek basamaklı sayıları 0 ile doldurarak)
                daysSpan.textContent = String(days).padStart(2, '0');
                hoursSpan.textContent = String(hours).padStart(2, '0');
                minutesSpan.textContent = String(minutes).padStart(2, '0');
                secondsSpan.textContent = String(seconds).padStart(2, '0');
            }

            // Geri sayımı her saniye güncellemek için setInterval kullanıyoruz
            countdownInterval = setInterval(updateCountdown, 1000);
            // Sayfa yüklendiğinde bir kere hemen güncelle, böylece gecikme olmaz
            updateCountdown(); 

            // "Sürprizi Gör!" butonuna tıklandığında yapılacaklar
            revealButton.addEventListener('click', function() {
                countdownSection.style.display = 'none'; // Geri sayım bölümünü gizle
                revealButton.style.display = 'none'; // Butonu gizle
                mainMessage.textContent = "İşte Sürprizim!"; // Ana mesajı değiştir
                secondaryMessage.textContent = "Umarım beğenirsin..."; // Alt mesajı değiştir
                surpriseContent.style.display = 'block'; // Sürpriz içeriği göster
                
                // Teklif sorusuna animasyon ekle
                offerQuestion.style.animation = 'bounceIn 1s ease-out 0.5s forwards';
                offerQuestion.style.opacity = '0'; // Animasyon başlamadan önce görünmez yap
            });

            // "Evet, seve seve!" butonuna tıklandığında yapılacaklar
            yesButton.addEventListener('click', function() {
                surpriseContent.style.display = 'none'; // Sürpriz içeriği gizle
                yesResponse.style.display = 'block'; // "Evet" cevabı mesajını göster
                noResponse.style.display = 'none'; // Diğer cevap mesajını gizle
                mainMessage.textContent = "Harika Haber!"; // Ana mesajı değiştir
                secondaryMessage.textContent = "Bir sonraki kahvemiz seninle!"; // Alt mesajı değiştir
            });

            // "Belki başka zaman..." butonuna tıklandığında yapılacaklar
            noButton.addEventListener('click', function() {
                surpriseContent.style.display = 'none'; // Sürpriz içeriği gizle
                noResponse.style.display = 'block'; // "Hayır" cevabı mesajını göster
                yesResponse.style.display = 'none'; // Diğer cevap mesajını gizle
                mainMessage.textContent = "Anladım..."; // Ana mesajı değiştir
                secondaryMessage.textContent = "Kısmet değilmiş."; // Alt mesajı değiştir
            });
        });
    </script>
