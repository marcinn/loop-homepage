+++
title = "a800mon"
date = 2026-08-28T00:00:00+02:00
summary = "Lekki monitor i debugger dla emulatorów komputerów 8-bitowych, oddzielający wygodny frontend od backendu emulacji."
featured = true
weight = 20
status = "prototyp"
project_id = "a800mon"
budget_id = "a800mon"
image = "https://raw.githubusercontent.com/a800mon/a800mon/master/assets/a800mon.png"
image_credit = "a800mon / GitHub"
image_credit_url = "https://github.com/a800mon/a800mon"
repository = "https://github.com/a800mon/a800mon"
technologies = ["Python", "Go", "Atari 8-bit", "debugger", "protokół binarny"]
+++

**a800mon** to lekki frontend monitora i debuggera dla emulatorów komputerów 8-bitowych. Zamiast tworzyć kolejny emulator, projekt definiuje własny binarny protokół komunikacji i buduje nad nim wygodne UI oraz CLI.

Pierwszym obsługiwanym backendem jest fork Atari800 z funkcją Remote Monitor. Architektura zakłada jednak, że ten sam frontend może pracować z innymi emulatorami, a w przyszłości także z urządzeniami sprzętowymi implementującymi protokół.

Projekt służy do eksperymentów z pamięcią, debugowania programów 6502 i budowania nowoczesnych narzędzi developerskich dla retrokomputerów.
