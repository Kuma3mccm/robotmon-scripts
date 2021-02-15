config = {
    sleep: 240,
    sleepAnimate: 800,
  
    run: true,
}

factoryType = ['wood', 'bean', 'sugar', 'tool', 'powder', 'bean_2', 'wood_2', 'powder_2', 'berry', 'berry_2', 'poweder_3', 'berry_3'];

pageBaseProductNoThirdFigure = [
    {x: 362, y: 23, r: 35, g: 30, b: 20},
    {x: 358, y: 23, r: 35, g: 30, b: 20},
    {x: 362, y: 19, r: 35, g: 30, b: 20},
    {x: 360, y: 16, r: 35, g: 30, b: 20},
    {x: 358, y: 19, r: 35, g: 30, b: 20},

]

pageWoodFarm = [
    {x: 584, y: 118, r: 121, g: 207, b: 12},
    {x: 206, y: 180, r: 251, g: 233, b: 182},
    {x: 205, y: 183, r: 251, g: 235, b: 182},
    {x: 434, y: 73, r: 174, g: 98, b: 73},
]

pageBeanFarm = [
    {x: 590, y: 121, r: 121, g: 207, b: 12},
    {x: 311, y: 22, r: 0, g: 255, b: 247},
    {x: 427, y: 83, r: 0, g: 253, b: 251},
    {x: 152, y: 179, r: 219, g: 171, b: 130},
    {x: 425, y: 82, r: 2, g: 252, b: 250}
]

pageSugarFarm = [
    {x: 586, y: 119, r: 121, g: 207, b: 12},
    {x: 426, y: 69, r: 237, g: 245, b: 245},
    {x: 276, y: 105, r: 217, g: 233, b: 232},
    {x: 171, y: 170, r: 142, g: 161, b: 178}
]

pagePowderFarm = [
    {x: 582, y: 119, r: 121, g: 207, b: 12},
    {x: 315, y: 24, r: 159, g: 117, b: 52},
    {x: 435, y: 91, r: 158, g: 117, b: 51},
    {x: 182, y: 185, r: 255, g: 239, b: 195},
    {x: 169, y: 190, r: 231, g: 149, b: 74}
]

pageBarryFarm = [
    {x: 571, y: 116, r: 121, g: 207, b: 13},
    {x: 304, y: 21, r: 190, g: 37, b: 37},
    {x: 409, y: 89, r: 174, g: 10, b: 24},
    {x: 236, y: 142, r: 250, g: 232, b: 181},
    {x: 220, y: 159, r: 213, g: 23, b: 39}
]

pageMilkFarm = [
    {x: 587, y: 121, r: 121, g: 207, b: 12},
    {x: 303, y: 25, r: 238, g: 245, b: 241},
    {x: 418, y: 91, r: 246, g: 246, b: 238},
    {x: 269, y: 169, r: 255, g: 254, b: 241}
]


function pnt(x, y) {
return {x: x, y: y};
}

function rgb(r, g, b) {
return {r:r, g:g, b:b}
}

function qTap(page, sleepTime) {
if (sleepTime == undefined) {
    sleepTime = config.sleep;
}
if (Array.isArray(page)) {
    page = page[0];
}
tap(page.x, page.y, sleepTime);
sleep(sleepTime);
}

function isSameColor(c1, c2, diff) {
if (diff === undefined) {
    diff = 35;
}
// console.log(JSON.stringify(c1), JSON.stringify(c2), diff);
if (Math.abs(c1.r - c2.r) < diff && Math.abs(c1.g - c2.g) < diff && Math.abs(c1.b - c2.b) < diff) {
    return true;
}
return false;
}

function checkIsPage(page, diff, img) {
var release = false;
if (img === undefined) {
    img = getScreenshot();
    release = true;
}
var whSize = getImageSize(img);
if (whSize.width === 360) {
    throw new Error('ROBroken');
}
var isPage = true;
for (var i in page) {
    var cbtn = page[i];
    var color = getImageColor(img, cbtn.x, cbtn.y);
    if (!isSameColor(cbtn, color, diff)) {
    isPage = false;
    break;
    }
}
if (release) {
    releaseImage(img);
}
return isPage;
}

function JobScheduling() {
    isNoThirdFigure = checkIsPage(pageBaseProductNoThirdFigure);
    console.log('no 3rd figure => ', isNoThirdFigure)
    if (!isNoThirdFigure) {
        console.log('> 99, no need to add more')
        return true;
    }

    pageAnyProduction = [
        {x: 33, y: 56, r: 166, g: 104, b: 65},
        {x: 32, y: 106, r: 166, g: 104, b: 65},
    ]
    pageAlreadyProducing = [
        {x: 459, y: 39, r: 54, g: 173, b: 224},
        {x: 400, y: 48, r: 60, g: 70, b: 105},
    ]
    if (checkIsPage(pageAnyProduction)) {
        qTap(pnt(48, 74));
        sleep(config.sleepAnimate);
    }
    if (checkIsPage(pageAlreadyProducing)) {
        qTap(pageAlreadyProducing);
        sleep(config.sleepAnimate * 2);
    }

    pageFirstItemEnabled = [
        {x: 569, y: 119, r: 121, g: 207, b: 12},
    ]
    pageSecondItemEnabled = [
        {x: 571, y: 223, r: 121, g: 207, b: 12},
    ]
    pageThirdItemEnabled = [
        {x: 568, y: 329, r: 121, g: 207, b: 14},
    ]

    if (checkIsPage(pageWoodFarm) && isNoThirdFigure){
        console.log('add wood')
        qTap(pageWoodFarm)
        sleep(config.sleep);
        qTap(pageWoodFarm)
        sleep(config.sleep);
        qTap(pageWoodFarm)
        sleep(config.sleep);
        qTap(pageWoodFarm)
        return true;
    }
    else if (checkIsPage(pageBeanFarm)){
        console.log('bean farm')
        if (isNoThirdFigure) {
            console.log('... add more')
            qTap(pageBeanFarm)    
            sleep(config.sleep);
            qTap(pageBeanFarm)    
            sleep(config.sleep);
            qTap(pageBeanFarm)    
            sleep(config.sleep);
            qTap(pageBeanFarm)    
            return true;
        }
    }
    else if (checkIsPage(pageSugarFarm)){
        console.log('sugar farm')
        if (isNoThirdFigure) {
            console.log('... add more')
            qTap(pageSugarFarm)    
            sleep(config.sleep);
            qTap(pageSugarFarm)    
            sleep(config.sleep);
            qTap(pageSugarFarm)    
            sleep(config.sleep);
            qTap(pageSugarFarm)    
            return true;
        }
    }
    else if (checkIsPage(pagePowderFarm)){
        console.log('Powder farm')
        if (isNoThirdFigure) {
            console.log('... add more')

            if (checkIsPage(pageSecondItemEnabled)) {
                qTap(pageSecondItemEnabled);
                sleep(config.sleep);
                qTap(pageSecondItemEnabled);
                sleep(config.sleep);
                qTap(pageSecondItemEnabled);
                qTap(pageSecondItemEnabled);
            } else {
                qTap(pagePowderFarm)
                sleep(config.sleep);
                qTap(pagePowderFarm)
                sleep(config.sleep);
                qTap(pagePowderFarm)
                qTap(pagePowderFarm)    
            }
            return true;
        }
    }
    else if (checkIsPage(pageBarryFarm)){
        console.log('Barry farm')
        if (isNoThirdFigure) {
            console.log('... add more')

            if (checkIsPage(pageSecondItemEnabled)) {
                qTap(pageSecondItemEnabled);
                sleep(config.sleep);
                qTap(pageSecondItemEnabled);
                sleep(config.sleep);
                qTap(pageSecondItemEnabled);
            }
            else {
                qTap(pageBarryFarm)
                sleep(config.sleep);
                qTap(pageBarryFarm)
                sleep(config.sleep);
                qTap(pageBarryFarm)
                sleep(config.sleep);
                qTap(pageBarryFarm)
            }
            return true;
        }
    }
    else if (checkIsPage(pageMilkFarm)){
        console.log('Milk farm', checkIsPage(pageBaseProductNoThirdFigure))
        if (isNoThirdFigure) {
            console.log('... add more')
            qTap(pageMilkFarm)    
            sleep(config.sleep);
            qTap(pageMilkFarm)    
            sleep(config.sleep);
            qTap(pageMilkFarm)    
            sleep(config.sleep);
            qTap(pageMilkFarm)    
            return true;
        }
    }

    pageFirstItemEnabled = [
        {x: 587, y: 122, r: 121, g: 207, b: 12}
    ]
    pageSecondItemEnabled = [
        {x: 587, y: 230, r: 121, g: 207, b: 12}
    ]
    pageThirdItemEnabled = [
        {x: 587, y: 332, r: 121, g: 207, b: 12}
    ]

    pageFirstItemHasOneDigits = [
        {x: 446, y: 107, r: 255, g: 255, b: 255},
        {x: 437, y: 107, r: 255, g: 255, b: 255}
    ]

    pageSecondItemHasOneDigits = [
        {x: 446, y: 213, r: 255, g: 255, b: 255},
        {x: 437, y: 213, r: 255, g: 255, b: 255}
    ]

    pageThirdItemHasOneDigits = [
        {x: 446, y: 320, r: 255, g: 255, b: 255},
        {x: 437, y: 320, r: 255, g: 255, b: 255}
    ]

    //rgb(77,71,65)
    pageFirstItemHasThreeDigits = [
        {x: 436, y: 107, r: 77, g: 71, b: 65}
    ]
    //rgb(203,201,199)
    pageSecondItemHasThreeDigits = [
        {x: 437, y: 212, r: 65, g: 58, b: 51}
    ]
    pageThirdItemHasThreeDigits = [
        {x: 436, y: 320, r: 77, g: 71, b: 65}
    ]

    itemsAdd = 0;
    // add < 10
    if (checkIsPage(pageFirstItemHasOneDigits)) {
        console.log('add 1st item to > 10')
        qTap(pageFirstItemEnabled);
        sleep(config.sleepAnimate);
        if (!handleNotEnoughStock()) {
            itemsAdd ++;
        }
    }

    if (!checkIsPage(pageSecondItemEnabled)) {
        return;
    } else {
        if (checkIsPage(pageSecondItemHasOneDigits)) {
            console.log('add 2nd item to > 10')
            qTap(pageSecondItemEnabled);
            sleep(config.sleepAnimate);
            if (!handleNotEnoughStock()) {
                itemsAdd ++;
            }
        }    
    }

    if (!checkIsPage(pageThirdItemEnabled)) {
        // return;
    } else {
        if (checkIsPage(pageThirdItemHasOneDigits)) {
            console.log('add 3rd item to > 10')
            qTap(pageThirdItemEnabled);
            sleep(config.sleepAnimate);
            if (!handleNotEnoughStock()) {
                itemsAdd ++;
            }
        }
    }

    if (itemsAdd > 2) {
        return true;
    }

    // add 10 < x < 100
    if (!checkIsPage(pageFirstItemHasThreeDigits) && checkIsPage(pageFirstItemEnabled)) {
        console.log('add 1st item to > 100')
        qTap(pageFirstItemEnabled);
        sleep(config.sleepAnimate);
        if (!handleNotEnoughStock()) {
            itemsAdd ++;
        }
    }

    if (!checkIsPage(pageSecondItemEnabled)) {
        return;
    } else {
        if (!checkIsPage(pageSecondItemHasThreeDigits)) {
            console.log('add 2nd item to > 100')
            qTap(pageSecondItemEnabled);
            sleep(config.sleepAnimate);
            if (!handleNotEnoughStock()) {
                itemsAdd ++;
            }
        }    
    }

    if (!checkIsPage(pageThirdItemEnabled)) {
        // return;
    } else {
        if (!checkIsPage(pageThirdItemHasThreeDigits)) {
            console.log('add 3rd item to > 100')
            qTap(pageThirdItemEnabled);
            sleep(config.sleepAnimate);
            if (!handleNotEnoughStock()) {
                itemsAdd ++;
            }
        }
    }

    if (itemsAdd > 2) {
        return true;
    }

    // === tool shop ===

    // end of tool shop ===
    
    // Slide to buttom
    tapDown(515, 340, 40, 0);
    sleep(config.sleep);
    moveTo(515, 150, 40, 0);
    sleep(config.sleep);
    moveTo(515, -1500, 40, 0);
    sleep(config.sleep);
    tapUp(515, -150, 40, 0);
    sleep(config.sleepAnimate * 2);

    pageFirstItemHasOneDigits = [
        {x: 446, y: 112, r: 255, g: 255, b: 255},
        {x: 437, y: 112, r: 255, g: 255, b: 255}
    ]
    pageSecondItemHasOneDigits = [
        {x: 446, y: 217, r: 255, g: 255, b: 255},
        {x: 437, y: 217, r: 255, g: 255, b: 255}
    ]
    pageThirdItemHasOneDigits = [
        {x: 446, y: 324, r: 255, g: 255, b: 255},
        {x: 437, y: 324, r: 255, g: 255, b: 255}
    ]

    pageSecondItemHasThreeDigits = [
        {x: 436, y: 217, r: 77, g: 71, b: 65}
    ]
    pageThirdItemHasThreeDigits = [
        {x: 436, y: 324, r: 77, g: 71, b: 65}
    ]

    // add < 10
    if (!checkIsPage(pageFirstItemEnabled)) {
        return;
    } else {
        if (checkIsPage(pageFirstItemHasOneDigits)) {
            console.log('add 4th item to > 10')
            qTap(pageFirstItemEnabled);
            sleep(config.sleepAnimate);
            if (!handleNotEnoughStock()) {
                itemsAdd ++;
            }
        }
    }

    if (!checkIsPage(pageSecondItemEnabled)) {
        return;
    } else {
        if (checkIsPage(pageSecondItemHasOneDigits)) {
            console.log('add 5th item to > 10')
            qTap(pageSecondItemEnabled);
            sleep(config.sleepAnimate);
            if (!handleNotEnoughStock()) {
                itemsAdd ++;
            }
        }    
    }

    if (!checkIsPage(pageThirdItemEnabled)) {
        // return;
    } else {
        if (checkIsPage(pageThirdItemHasOneDigits)) {
            console.log('add 6th item to > 10')
            qTap(pageThirdItemEnabled);
            sleep(config.sleepAnimate);
            if (!handleNotEnoughStock()) {
                itemsAdd ++;
            }
        }
    }

    if (itemsAdd > 2) {
        return true;
    }

    // add 10 < x < 100
    if (!checkIsPage(pageFirstItemHasThreeDigits) && checkIsPage(pageFirstItemEnabled)) {
        console.log('add 4th item to > 100')
        qTap(pageFirstItemEnabled);
        sleep(config.sleepAnimate);
        if (!handleNotEnoughStock()) {
            itemsAdd ++;
        }
    }

    if (!checkIsPage(pageSecondItemEnabled)) {
        return;
    } else {
        if (!checkIsPage(pageSecondItemHasThreeDigits)) {
            console.log('add 5th item to > 100')
            qTap(pageSecondItemEnabled);
            sleep(config.sleepAnimate);
            if (!handleNotEnoughStock()) {
                itemsAdd ++;
            }
        }    
    }

    if (!checkIsPage(pageThirdItemEnabled)) {
        // return;
    } else {
        if (!checkIsPage(pageThirdItemHasThreeDigits)) {
            console.log('add 6th item to > 100')
            qTap(pageThirdItemEnabled);
            sleep(config.sleepAnimate);
            if (!handleNotEnoughStock()) {
                itemsAdd ++;
            }
        }
    }
}

function handleNotEnoughStock() {
    pageNotEnoughStock = [
        {x: 428, y: 98, r: 56, g: 167, b: 231},
        {x: 345, y: 104, r: 60, g: 70, b: 105},
        {x: 370, y: 176, r: 243, g: 233, b: 223},
        {x: 349, y: 247, r: 121, g: 207, b: 12}
    ]
    if (checkIsPage(pageNotEnoughStock)) {
        console.log('quiting not enougth stock')
        qTap(pageNotEnoughStock);
        sleep(config.sleep);
        return true;
    }

    pageTwoItemNotEnoughStock = [
        {x: 444, y: 98, r: 56, g: 166, b: 231},
        {x: 375, y: 105, r: 60, g: 70, b: 105},
        {x: 420, y: 203, r: 243, g: 233, b: 223},
        {x: 416, y: 246, r: 219, g: 207, b: 199}
    ]
    if (checkIsPage(pageTwoItemNotEnoughStock)) {
        console.log('quiting not enougth stock 2')
        qTap(pageTwoItemNotEnoughStock);
        sleep(config.sleep);
        return true;
    }

    return false;
}

function start() {

    for (var i = 1; i < 100000000; i++) {
        var runMain = false;
        console.log("start loop", i);
  
        var act = JobScheduling();
        sleep(config.sleep);
        handleNotEnoughStock();
        sleep(config.sleep);
        qTap(pnt(349, 174)); // next
        sleep(config.sleepAnimate);

        if (config.run == false) {
            console.log('jobs done!')
            break;
        }
    }
  }
  
  
//   start();
  JobScheduling()
