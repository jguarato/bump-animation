function moveObject(element, offset) {
	const transformStyle = element.style.transform;
	let translate = transformStyle.replace(/[^-?\d*\.{0,1}\d+$]/g, "");
	translate = translate === "" ? 0 : parseFloat(translate);

	element.style.transform = `translatex(${translate + offset}vw)`;
}

function detectContact(element1, element2) {
	const delta = 25; // to consider leftover spaces in the div
	const el1Left = element1.getBoundingClientRect().left + delta;
	const el1Right = element1.getBoundingClientRect().right - delta;

	const el2Left = element2.getBoundingClientRect().left + delta;
	const el2Right = element2.getBoundingClientRect().right - delta;

	let checkContact = el1Left <= el2Left && el1Right >= el2Left;
	checkContact = checkContact || (el1Left <= el2Right && el1Right >= el2Right);

	return checkContact;
}

function executeFistBump() {
	const velocitySlider = document.querySelector("#velocitySlider");
	const repetitionsNum = document.querySelector("#repetitionsNum");

	const intervalTime = -Number.parseInt(velocitySlider.value); // in milliseconds | one offset is shown for each intervalTime
	const repeatFistBump = Number.parseInt(repetitionsNum.value); // number of times the fist bump will occur

	const absOffset = 1; // in vw

	const leftFist = document.querySelector("#left-fist");
	leftFist.fistBumpOffset = absOffset;
	const rightFist = document.querySelector("#right-fist");
	rightFist.fistBumpOffset = -absOffset;

	let counter = 0;
	let bumpTimes = 1;

	const fistBump = setInterval(function () {
		const checkContact = detectContact(leftFist, rightFist);

		if (checkContact) {
			leftFist.fistBumpOffset = -absOffset;
			rightFist.fistBumpOffset = absOffset;
			counter = 6; // related to the return position of the fists
		}

		const leftFistOffset = leftFist.fistBumpOffset;
		moveObject(leftFist, leftFistOffset);

		const rightFistOffset = rightFist.fistBumpOffset;
		moveObject(rightFist, rightFistOffset);

		counter--;

		if (counter === 0 && bumpTimes === repeatFistBump) {
			clearInterval(fistBump);
		} else if (counter === 0) {
			leftFist.fistBumpOffset = absOffset;
			rightFist.fistBumpOffset = -absOffset;
			bumpTimes++;
		}
	}, intervalTime);
}

const button = document.querySelector("#goBtn");
button.onclick = executeFistBump;