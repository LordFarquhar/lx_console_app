/* 
 *  Copyright (C) 2022  Daniel Farquharson
 *  
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, version 3 (GPLv3)
 *  
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *  
 *  See https://github.com/PenumbraProduction/lx_console_app/blob/main/LICENSE an 
 *  implementation of GPLv3 (https://www.gnu.org/licenses/gpl-3.0.html)
 */

import "../../../css/splash.scss";

import { SplashAPI } from "../../main/splash_preload";

type BridgedWindow = Window &
	typeof globalThis & {
		splashApi: any;
	};

export const api: SplashAPI = (window as BridgedWindow).splashApi.api;

const spotlightSize = 250;

document.documentElement.style.setProperty("--spotlight-size", spotlightSize.toString() + "px");

document.addEventListener(
	"mousemove",
	function (event) {
		// Get the coordinates of the title
		const titleRect = document.querySelector(".title").getBoundingClientRect();

		// Grab the mouse's X-position
		const mouseX = event.clientX;

		// Position spotlight x coordinate based on mouse x, center based on width of spotlight, take into account element x offset
		const spotlightX = mouseX - spotlightSize / 2 - titleRect.left;

		// Grab the mouse's Y position
		const mouseY = event.clientY;

		// Position spotlight y coordinate based on mouse y, center based on width of spotlight, take into account element y offset
		const spotlightY = mouseY - spotlightSize / 2 - titleRect.top;

		// Set x and y position of spotlight
		const element = document.querySelector(".title") as HTMLElement;
		element.style.backgroundPosition = spotlightX + "px " + spotlightY + "px";
	},
	false
);

api.ipcHandle("updateLoadingJob", (e, data, type) => {
	if (type == "error") {
		document.documentElement.style.setProperty("--bg-color", "#351b1b");
		document.documentElement.style.setProperty("--star-color", "rgb(255, 95, 95)");
	} else {
		document.documentElement.style.setProperty("--bg-color", "#1b2735");
		document.documentElement.style.setProperty("--star-color", "rgba(95, 145, 255, 1)");
	}
	document.querySelector(".currentJob").textContent = data;
});
