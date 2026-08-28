+++
title = "a800mon"
date = 2026-08-28T00:00:00+02:00
summary = "Monitor i debugger dla emulatorów komputerów 8-bitowych — narzędzie deweloperskie, które przy okazji uczy architektury mikroprocesorów na przykładzie popularnych maszyn, takich jak Atari."
featured = true
weight = 20
status = "prototyp"
project_id = "a800mon"
budget_id = "a800mon"
image = "img/projects/a800mon/montezuma.jpg"
image_credit = "a800mon / YouTube"
image_credit_url = "https://www.youtube.com/watch?v=9Co0CPifd6Y"
repository = "https://github.com/a800mon/a800mon"
discord = "https://discord.gg/wNZjKgFunJ"
technologies = ["Python", "Go", "Atari 8-bit", "debugger", "protokół binarny", "6502", "edukacja"]
+++

**a800mon** to frontend monitora i debuggera dla emulatorów komputerów 8-bitowych. Zamiast tworzyć kolejny emulator, projekt definiuje własny binarny protokół komunikacji i buduje nad nim wygodne UI oraz CLI.

Pierwszym obsługiwanym backendem jest fork Atari800 z funkcją Remote Monitor, ale architektura zakłada, że ten sam frontend może współpracować z innymi emulatorami, a docelowo także z urządzeniami sprzętowymi implementującymi ten sam protokół.

Projekt służy do eksperymentów z pamięcią, debugowania programów na 6502 i budowania nowoczesnych narzędzi deweloperskich dla środowiska retrokomputerów.

Ma też wyraźny cel dydaktyczny: pokazuje, jak naprawdę działa komputer 8-bitowy, na przykładzie popularnych maszyn takich jak Atari. Podgląd listy wyświetlania, zawartości pamięci, rejestrów procesora 6502 i pracy dezasemblera w czasie rzeczywistym zamienia wiedzę o architekturze mikroprocesorów z abstrakcji w coś, co można na żywo zobaczyć i przetestować — a800mon jest przy okazji świetnym narzędziem dydaktycznym.

Dobrze pokazują to krótkie demonstracje przeszukiwania pamięci w klasycznych grach: w River Raid i Montezuma's Revenge dołączony trener (`go800mon trainer`) zawęża tysiące potencjalnych adresów do jednego bajtu przechowującego liczbę żyć, a następnie pułapka na zapis do tego adresu prowadzi wprost do konkretnej instrukcji procesora, która tę wartość zmniejsza. To ten sam proces, jakiego uczy się na kursach architektury komputerów — tu w pełni namacalnej, praktycznej formie.

Narzędzie jest już dyskutowane w społeczności retrokomputerowej, m.in. na forum atari.org.pl, gdzie porównywano je do rozwiązań takich jak RetroDebugger czy debugger Altirry.

## Filmy

### Cheating River Raid in 120 seconds

{{< youtube id="Cgu8ZdueZ6E" title="a800mon — Cheating River Raid in 120 seconds" loading="lazy" >}}

### Cheating Montezuma in 60 seconds

{{< youtube id="9Co0CPifd6Y" title="a800mon — Cheating Montezuma in 60 seconds" loading="lazy" >}}

## Zrzuty ekranu

<div class="prose-gallery">

{{< shot src="img/projects/a800mon/monitor-ui.jpg" alt="Interfejs monitora a800mon z podglądem listy wyświetlania, bufora ekranu, dezasemblera i historii rozkazów" caption="Interfejs a800mon: lista wyświetlania, bufor ekranu, dezasembler 6502, historia rozkazów i pułapki pamięciowe w jednym widoku." >}}

{{< shot src="img/projects/a800mon/search-montezuma.jpg" alt="Rozpoczęcie przeszukiwania pamięci a800mon w grze Montezuma's Revenge" caption="Start poszukiwań w Montezuma's Revenge — trener zaczyna od 271 pasujących adresów." >}}

{{< shot src="img/projects/a800mon/trainer-river-raid.jpg" alt="Trener pamięci a800mon zawężający adres licznika żyć w grze River Raid" caption="Przeszukiwanie pamięci w River Raid — trener zawęża tysiące adresów do jednego bajtu przechowującego liczbę żyć." >}}

{{< shot src="img/projects/a800mon/breakpoint-river-raid.jpg" alt="Debugger a800mon zatrzymany na pułapce pamięciowej w grze River Raid" caption="Pułapka na zapis do znalezionego adresu prowadzi wprost do instrukcji procesora, która zmniejsza liczbę żyć." >}}

{{< shot src="img/projects/a800mon/trainer-montezuma.jpg" alt="Debugger a800mon z pułapką pamięciową w grze Montezuma's Revenge" caption="Ten sam proces w Montezuma's Revenge — pojedynczy dopasowany adres i aktywna pułapka na zapis." >}}

{{< shot src="img/projects/a800mon/river-raid.jpg" alt="Rozgrywka w River Raid podczas testów a800mon" caption="River Raid — gra, na której nagrano demonstrację przeszukiwania pamięci." >}}

</div>
