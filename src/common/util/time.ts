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

export const wait = (millis: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, millis));

export const debounce = (func: (...args: any[]) => void, waitMs: number) => {
	let timeout: NodeJS.Timeout;
	return function executedFunction(...args: any[]) {
		const later = () => {
			timeout = null;
			func(...args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, waitMs);
	};
};
