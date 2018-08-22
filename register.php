<?php
    $con = new mysqli("127.0.0.1","admin","1234","star_battle");
    $con -> set_charset("utf8");
    
    $json = $_POST["json"];
    $json = json_decode($json, true);
    
    $name = $json[0]["name"];
    $score = $json[0]["score"];
    $time = $json[0]["time"];

    $con -> query("insert into rank values('','$name','$score','$time')");
    
    $rank = array();
    $sel = $con -> query("select * from rank");
    while($sea = mysqli_fetch_array($sel)){
        $inf = array(
            "id" => $sea["id"],
            "name" => $sea["name"],
            "score" => $sea["score"],
            "time" => $sea["time"]
        );

        array_push($rank, $inf);
    }

    $rank_json = json_encode($rank);
    echo $rank_json;

    $con -> close();
?>