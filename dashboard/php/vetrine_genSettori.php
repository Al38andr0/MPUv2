<?php
include('connessione.php');
include('funzioni.php');

$sql = "SELECT * FROM composizioni c JOIN linee l ON c.cmp_line_id = l.line_id";
$result = mysqli_query($con, $sql);
while ($row = $result->fetch_assoc()) {
    $sql_U = "UPDATE composizioni SET cmp_settore = '" . $row['line_set'] . "' WHERE cmp_id = " . $row['cmp_id'];

    if (mysqli_query($con, $sql_U)) {
        echo $row['line_set'] . "\r\n";
        echo "Record updated successfully" . "\r\n";
    } else {
        echo "Error updating record: " . mysqli_error($con) . "\r\n";
    }
}

mysqli_close($con);

