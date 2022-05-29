<?php
    //CONNESSIONE al DB
    require_once 'hw1_config.php';
    //CONNESSIONE al DB
    $conn = connetti();
    
    $id_sondaggio = $_GET["id_sondaggio"];
    

    $occorrenze_voto = array();
    
    $n_opzioni = array();


    $query = "SELECT count(DISTINCT p.Voto) as cont FROM opzioni as o JOIN partecipanti as p ON o.Id = p.Voto WHERE o.Sondaggio = $id_sondaggio";
    $res1 = mysqli_query($conn, $query);
    while($row = mysqli_fetch_assoc($res1))  {
        $n_opzioni = $row;
    }
    
//    echo $n_opzioni['cont']; 

    for( $i=1; $i <= $n_opzioni['cont']; $i++ ) {
        $query = "SELECT p.voto , count(*) as n_occ_voto, o.opzione FROM opzioni as o JOIN partecipanti as p ON o.Id = p.Voto WHERE o.Sondaggio = $id_sondaggio AND p.voto = $i";
        $res2 = mysqli_query($conn, $query);
        while($row = mysqli_fetch_assoc($res2))  {
            $occorrenze_voto[] = $row;
        }    
    }

    //libero spazio occupato dai risultati di una query
    mysqli_free_result($res1);
    mysqli_free_result($res2);
    
    //chiusura della connessione
    mysqli_close($conn);

    //ritorno il json
    echo json_encode($occorrenze_voto);


    //noto che: p.voto è una informazione ridondante
?>
