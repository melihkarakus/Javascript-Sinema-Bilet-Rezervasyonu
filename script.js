// HTML üzerindeki gerekli elementleri seçiyoruz
const container = document.querySelector('.container');
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const select = document.getElementById('movie');
const seats = document.querySelectorAll('.seat:not(.reserved)');

// Sayfa yüklendiğinde önceki tercihleri almak için localStorage'ı kontrol ediyoruz
getFromLocalStorage();

// Toplam tutarı hesaplamak için fonksiyonu çağırıyoruz
calculateTotal();

// Koltuklara tıklama olayını dinleyen bir event listener ekliyoruz
container.addEventListener('click', function(e) {
    // Eğer tıklanan element bir koltuk ve rezerve edilmemişse
    if (e.target.classList.contains('seat') && !e.target.classList.contains('reserved')) {
        // Koltuğun seçilip seçilmediğini ters çeviriyoruz
        e.target.classList.toggle('selected');
        // Toplam tutarı tekrar hesaplıyoruz
        calculateTotal();
    }
});

// Film seçimi değiştiğinde event listener ekliyoruz
select.addEventListener('change', function(e){
    // Toplam tutarı tekrar hesaplıyoruz
    calculateTotal();
});

// Toplam tutarı hesaplamak için fonksiyon
function calculateTotal() {
    // Seçili koltukları seçiyoruz
    const selectedSeats = container.querySelectorAll('.seat.selected');

    // Seçili koltukların ve tüm koltukların listesini oluşturuyoruz
    const selectedSeatsArr = Array.from(selectedSeats);
    const seatsArr = Array.from(seats);

    // Seçili koltukların index'lerini buluyoruz
    let selectedSeatIndexs = selectedSeatsArr.map(function(seat){
        return seatsArr.indexOf(seat);
    });

    // Seçili koltuk sayısını ve toplam tutarı güncelliyoruz
    let selectedSeatCount = selectedSeats.length;
    count.innerText = selectedSeatCount;
    amount.innerText = selectedSeatCount * select.value;

    // Seçili koltukları localStorage'a kaydediyoruz
    saveToLocalStorage(selectedSeatIndexs);
}

// localStorage'dan verileri almak için fonksiyon
function getFromLocalStorage() {
    // Seçili koltukları alıyoruz
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
   
    // Eğer seçili koltuk varsa, sayfada işaretli olarak gösteriyoruz
    if (selectedSeats != null && selectedSeats.length > 0) {
        seats.forEach(function(seat, index){
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    // Seçili film index'ini alıyoruz ve seçili filmi ayarlıyoruz
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (selectedMovieIndex != null) {
        select.selectedIndex = selectedMovieIndex;
    }
}

// Seçili koltukları ve film index'ini localStorage'a kaydetmek için fonksiyon
function saveToLocalStorage(indexs) {
    localStorage.setItem('selectedSeats', JSON.stringify(indexs));
    localStorage.setItem('selectedMovieIndex', select.selectedIndex);
}

