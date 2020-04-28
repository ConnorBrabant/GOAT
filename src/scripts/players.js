//LBJ - 237 
//MJ - 2931
//Magic - 2994 
//Larry - 2851

// pts, stl, blk, turnover, reb, ast
//RECEIVE A PLAYERS STATS 
document.addEventListener('DOMContentLoaded', () => {
    let players = {};
    const xhrLBJ = new XMLHttpRequest();
    xhrLBJ.onreadystatechange = function() {
        if (xhrLBJ.readyState == XMLHttpRequest.DONE) {
            let LBJ = { Player: 'Lebron James',
                        Points: JSON.parse(xhrLBJ.responseText).data[0].pts,
                        Rebounds: JSON.parse(xhrLBJ.responseText).data[0].reb,
                        Assists: JSON.parse(xhrLBJ.responseText).data[0].ast,
                        Blocks: JSON.parse(xhrLBJ.responseText).data[0].blk,
                        Steals: JSON.parse(xhrLBJ.responseText).data[0].stl,
                        Turnovers: JSON.parse(xhrLBJ.responseText).data[0].turnover
                    }
            players['LeBron James'] = LBJ;

        }
    }
    xhrLBJ.open('GET', "https://www.balldontlie.io/api/v1/season_averages?season=2018&player_ids[]=237")
    xhrLBJ.send();

    const xhrLarry = new XMLHttpRequest();
    xhrLarry.onreadystatechange = function() {
        if (xhrLarry.readyState == XMLHttpRequest.DONE) {
            let LB = {
                Player: 'Larry Bird',
                Points: JSON.parse(xhrLarry.responseText).data[0].pts,
                Rebounds: JSON.parse(xhrLarry.responseText).data[0].reb,
                Assists: JSON.parse(xhrLarry.responseText).data[0].ast,
                Blocks: JSON.parse(xhrLarry.responseText).data[0].blk,
                Steals: JSON.parse(xhrLarry.responseText).data[0].stl,
                Turnovers: JSON.parse(xhrLarry.responseText).data[0].turnover
            }
            players['Larry Bird'] = LB;
            document.getElementById('Larry').text = LB.Player
        }
    }
    xhrLarry.open('GET', "https://www.balldontlie.io/api/v1/season_averages?season=1986&player_ids[]=2851")
    xhrLarry.send();

    const xhrMJ = new XMLHttpRequest();
    xhrMJ.onreadystatechange = function () {
        if (xhrMJ.readyState == XMLHttpRequest.DONE) {
            let MJ = {
                Player: 'Michael Jordan',
                Points: JSON.parse(xhrMJ.responseText).data[0].pts,
                Rebounds: JSON.parse(xhrMJ.responseText).data[0].reb,
                Assists: JSON.parse(xhrMJ.responseText).data[0].ast,
                Blocks: JSON.parse(xhrMJ.responseText).data[0].blk,
                Steals: JSON.parse(xhrMJ.responseText).data[0].stl,
                Turnovers: JSON.parse(xhrMJ.responseText).data[0].turnover
            }
            players['Michael Jordan'] = MJ;
        }
    }
    xhrMJ.open('GET', "https://www.balldontlie.io/api/v1/season_averages?season=1988&player_ids[]=2931")
    xhrMJ.send();

    const xhrMagic = new XMLHttpRequest();
    xhrMagic.onreadystatechange = function () {
        if (xhrMagic.readyState == XMLHttpRequest.DONE) {
            let Magic = {
                Player: 'Magic Johnson',
                Points: JSON.parse(xhrMagic.responseText).data[0].pts,
                Rebounds: JSON.parse(xhrMagic.responseText).data[0].reb,
                Assists: JSON.parse(xhrMagic.responseText).data[0].ast,
                Blocks: JSON.parse(xhrMagic.responseText).data[0].blk,
                Steals: JSON.parse(xhrMagic.responseText).data[0].stl,
                Turnovers: JSON.parse(xhrMagic.responseText).data[0].turnover
            }
            players['Magic Johnson'] = Magic;
            console.log(players);
        }
    }
    xhrMagic.open('GET', "https://www.balldontlie.io/api/v1/season_averages?season=1988&player_ids[]=2994")
    xhrMagic.send();

});