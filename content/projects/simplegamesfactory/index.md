+++
title = "SimpleGamesFactory"
date = 2026-08-28T00:00:00+02:00
summary = "Zestaw bibliotek C++ do budowania gier na urządzeniach embedded (ESP32, Arduino) — od klasyków w stylu Arkanoida i Tetrisa po pseudo-3D strzelankę inspirowaną Wolfensteinem."
featured = true
weight = 30
status = "aktywny"
project_id = "simplegamesfactory"
budget_id = "simplegamesfactory"
image = "img/projects/simplegamesfactory/rigid-body-physics.jpg"
image_credit = "mjndev / X"
image_credit_url = "https://x.com/mjndev/status/2028770808714170775"
repository = "https://github.com/SimpleGamesFactory"
technologies = ["C++", "Arduino", "ESP32", "embedded", "gry", "raycasting"]
+++

**SimpleGamesFactory (SGF)** to biblioteka C++ do tworzenia gier na platformy embedded. Dostarcza podstawowe elementy potrzebne do zbudowania gry bez narzucania ciężkiej architektury silnika.

W ramach projektu rozwijane są m.in. pętla gry, sceny i przełączanie między nimi, obsługa akcji wejściowych, render targety, mechanizm `dirty rectangles`, kafelkowe odświeżanie obrazu, programowe sprite'y, kolizje i prostą fizykę brył sztywnych, narzędzia do pracy z formatem RGB565 oraz sterowniki wyświetlaczy. Silnik wspiera też rendering rzutem pseudo-3D (raycasting), dzięki czemu na tym samym mikrokontrolerze da się zbudować zarówno grę 2D, jak i prostą strzelankę w klimacie wczesnych FPS-ów.

Skalę zastosowań widać w repozytoriach demonstracyjnych organizacji: klony Arkanoida, Snake'a, Sokobana, Tetrisa i Blokusa, a także gra inspirowana Wolfensteinem 3D działająca na ESP32. Dzięki temu SGF jest jednocześnie biblioteką i poligonem do eksperymentów z ograniczonym sprzętem.

## Eksperymenty z AI

Projekt sprawdza też, jak dużą rolę w tym procesie może odgrywać sztuczna inteligencja — zarówno przy rozwoju samego rdzenia SGF, jak i przy samodzielnym budowaniu na nim pełnych, małych gier. Jedna z przykładowych gier posłużyła jako materiał referencyjny, na którym model uczył się API i konwencji SGF, po czym samodzielnie stworzył kolejne gry i biblioteki oparte na tych samych, gotowych komponentach.

## Filmy

### STM32U585 + ILI9341 z przewijaniem sprzętowym

{{< youtube id="OS-YPBP6bMM" title="STM32U585 + ILI9341 with hardware vscroll" loading="lazy" >}}

### Ulepszony klon Wolfensteina 3D na ESP32

{{< video src="video/projects/simplegamesfactory/wolf3d-improved.mp4" poster="img/projects/simplegamesfactory/wolf3d-improved.jpg" title="Ulepszony klon Wolfensteina 3D zbudowany na SGF i uruchomiony na ESP32" source="https://x.com/mjndev/status/2033182835293422024" >}}

### Demo z dźwiękiem i teksturami

{{< video src="video/projects/simplegamesfactory/wolf3d-sound-textures.mp4" poster="img/projects/simplegamesfactory/wolf3d-sound-textures.jpg" title="Demo gry w stylu Wolfensteina na ESP32, z dźwiękiem i teksturami" source="https://x.com/mjndev/status/2032778003088920790" >}}

### Fizyka brył sztywnych i kolizje

{{< video src="video/projects/simplegamesfactory/rigid-body-physics.mp4" poster="img/projects/simplegamesfactory/rigid-body-physics.jpg" title="Demonstracja fizyki brył sztywnych i colliderów w SGF" source="https://x.com/mjndev/status/2028770808714170775" >}}

### Sprzętowe wygaszanie obrazu

{{< video src="video/projects/simplegamesfactory/hardware-fade.mp4" poster="img/projects/simplegamesfactory/hardware-fade.jpg" title="Sprzętowy efekt fade in i fade out na ESP32 i wyświetlaczu ST7789" source="https://x.com/mjndev/status/2027515371616424323" >}}

## Zrzuty ekranu

<div class="prose-gallery">
<figure class="project-shot">
<img src="https://pbs.twimg.com/amplify_video_thumb/2026395868375425024/img/Zb-iMbiAbiLqkOFp.jpg" alt="Sokoban uruchomiony na mikrokontrolerze z biblioteką SGF">
<figcaption>Sokoban — jeden z klonów gier zbudowanych na SGF, uruchomiony na przenośnym module z wyświetlaczem. Źródło: <a href="https://x.com/mjndev/status/2026395960822128826" target="_blank" rel="noopener">X / mjndev</a></figcaption>
</figure>
</div>
