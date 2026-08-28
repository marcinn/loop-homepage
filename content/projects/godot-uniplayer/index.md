+++
title = "Godot UniPlayer"
date = 2026-08-28T00:00:00+02:00
summary = "Modularny kontroler postaci 3D dla Godot 4, składany z niezależnych zdolności, zachowań i gotowych prefabów."
featured = true
weight = 42
status = "w rozwoju"
project_id = "godot-plugins"
image = "img/projects/godot-uniplayer/custom-behavior.jpg"
image_credit = "GamesNotDeveloped / YouTube"
image_credit_url = "https://www.youtube.com/watch?v=5GfeZJ7GYYM"
repository = "https://github.com/GamesNotDeveloped/godot-uniplayer"
funding_label = "Godot Plugins"
technologies = ["Godot", "Godot Engine", "Godot 4", "GDScript", "kontroler gracza"]
+++

**Godot UniPlayer** to otwarty, modularny kontroler postaci 3D dla Godota 4. Zamiast jednego rozbudowanego skryptu lub zamkniętego prefabrykatu projekt pozwala budować sterowanie z małych, niezależnych zdolności (abilities) i zachowań (behaviours), które można dobierać do potrzeb konkretnej gry.

Projekt zapewnia gotowy punkt startowy, ale nie narzuca docelowej konstrukcji kontrolera. Można użyć dostarczonego prefabu, dostosować jego parametry, dodać kolejne komponenty jako węzły potomne albo utworzyć własną postać na bazie klas UniPlayera. Dzięki temu ten sam fundament może służyć zarówno do szybkiego prototypowania, jak i do budowania wyspecjalizowanego kontrolera rozwijanego razem z grą.

## Architektura komponentowa

Rdzeniem rozwiązania jest bazowa klasa gracza współpracująca z węzłami odpowiedzialnymi za pojedyncze funkcje. Ruch, obrót głowy, kamera, interakcje czy stan postaci nie muszą być na stałe połączone w jednej hierarchii dziedziczenia. Funkcjonalność kontrolera wynika z zestawu komponentów obecnych w scenie, dlatego można ją rozszerzać, ograniczać lub wymieniać bez przepisywania całego systemu.

Gotowe prefaby, w tym kontroler postaci FPS, można bezpośrednio dodać do sceny i skonfigurować przez właściwości eksportowane w edytorze. Bardziej zaawansowane projekty mogą zduplikować prefab, uczynić go lokalnym, zmienić jego strukturę albo rozszerzyć własną klasą. UniPlayer obsługuje również własne modele i kształty kolizji, więc warstwa sterowania nie jest związana z konkretną reprezentacją postaci.

## Dostępne możliwości

Aktualny zestaw komponentów obejmuje między innymi:

- poruszanie się, bieg, kucanie, skok, spadanie i odgłosy kroków,
- obrót głowy i kamery, zoom oraz efekt kołysania podczas ruchu,
- wykrywanie podłoża i interakcję z obszarami lub obiektami,
- zdrowie, regenerację, głód, zatrucie i wpływ odurzenia na sterowanie,
- obsługę śmierci oraz kilka strategii odradzania postaci,
- automatyczne przechwytywanie kursora i pomocniczy węzeł `RotationHelper`.

Własne zdolności i zachowania można implementować na tej samej bazie co komponenty wbudowane. Filmowa demonstracja pokazuje ten proces na przykładzie zachowania zmieniającego sposób poruszania i obraz kamery, dodanego do istniejącego kontrolera bez modyfikowania jego podstawowych funkcji.

## Zastosowanie i rozwój

UniPlayer jest przeznaczony przede wszystkim dla postaci opartych na `CharacterBody3D`. Może być lekką bazą do gier pierwszoosobowych, eksploracyjnych, symulatorów i prototypów wymagających szybkiego uruchomienia sterowanej postaci. Obsługa kontrolerów wykorzystujących fizykę `RigidBody3D` oraz pojazdów pozostaje kierunkiem dalszego rozwoju, a nie funkcją bieżącej wersji.

Projekt jest nadal rozwijany, dlatego część API i zachowań może się zmieniać. Kod jest dostępny na licencji BSD-3-Clause, co pozwala wykorzystywać go także w projektach komercyjnych, modyfikować i rozbudowywać bez uzależniania produktu od zamkniętego rozwiązania. Finansowanie UniPlayera jest przypisane do wspólnego budżetu Godot Plugins.

## Filmy

### Test modularnego kontrolera postaci

{{< youtube id="z32e0WeUpSI" title="Testing modular player controller / Godot 4 SDFGI" loading="lazy" >}}

### Dodawanie własnego zachowania

{{< youtube id="5GfeZJ7GYYM" title="Adding custom behavior to the player controller" loading="lazy" >}}

## Zrzuty ekranu

<div class="prose-gallery">

{{< shot src="img/projects/godot-uniplayer/editor-setup.png" alt="Godot UniPlayer skonfigurowany w edytorze Godot 4" caption="Prefab kontrolera FPS w edytorze Godota. Drzewo sceny pokazuje niezależne komponenty odpowiedzialne między innymi za ruch, obrót głowy, zoom, stan postaci i odradzanie." >}}

{{< shot src="img/projects/godot-uniplayer/modular-controller.jpg" alt="Scena testowa modularnego kontrolera Godot UniPlayer" caption="Scena testowa używana do sprawdzania kontrolera w działającym środowisku 3D." >}}

</div>
