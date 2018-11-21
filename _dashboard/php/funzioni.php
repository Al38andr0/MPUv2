<?php
function convertMark($id, $con) {
    $result = mysqli_query($con,"SELECT mark_nome FROM marchi WHERE mark_id = $id");
    while($row = mysqli_fetch_array($result)) {
        return $row['mark_nome'];
    }
};

function convertLine($id, $con) {
    $result = mysqli_query($con,"SELECT line_nome FROM linee WHERE line_id = $id");
    while($row = mysqli_fetch_array($result)) {
        return $row['line_nome'];
    }
};

function convertSet($id, $con) {
    $result = mysqli_query($con,"SELECT set_nome FROM settori WHERE set_id = $id");
    while($row = mysqli_fetch_array($result)) {
        return $row['set_nome'];
    }
};

function deleteDirectory($dir) {
    if (is_dir($dir)) {
        $objects = scandir($dir);
        foreach ($objects as $object) {
            if ($object != "." && $object != "..") {
                if (filetype($dir."/".$object) == "dir") deleteDirectory($dir."/".$object); else unlink($dir."/".$object);
            }
        }
        reset($objects);
        rmdir($dir);
    }
}

function copyDirectory($src,$dst) {
    $dir = opendir($src);
    @mkdir($dst);
    while(false !== ( $file = readdir($dir)) ) {
        if (( $file != '.' ) && ( $file != '..' )) {
            if ( is_dir($src . '/' . $file) ) {
                copyDirectory($src . '/' . $file,$dst . '/' . $file);
            }
            else {
                copy($src . '/' . $file,$dst . '/' . $file);
            }
        }
    }
    closedir($dir);
}