<?php

// die();


header('Content-Type: application/json; charset=utf-8');





$db = new PDO('mysql:host=localhost;dbname=to-do-list-db', 'root', '');


if($_SERVER['REQUEST_METHOD'] == 'GET') {

    $id = $_GET['id'] ?? null;

    if($id !== null) {
        $stmt = $db->prepare('select * from tasks where id=:id');
        $stmt->execute([
            ':id' => $id,
        ]);

        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        return;
    }

    $tasks = $db->query('select * from tasks')->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($tasks);
    return;
}

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $title = $_POST['title'] ?? null;
    $description = $_POST['description'] ?? null;

    if($title === null) {
        echo json_encode(false);
        return;
    }

    $stmt = $db->prepare('INSERT INTO tasks(`title`, `description`) VALUES(:title, :description)');
    $stmt->execute([
        ':title' => $title,
        ':description' => $description,
    ]);

    echo json_encode(['id' => $db->lastInsertId()]);
    return;
}

if($_SERVER['REQUEST_METHOD'] == 'PUT') {
    // parse_str(file_get_contents('php://input'), $_PUT);

    $id = $_GET['id'] ?? null;
    $status = $_PUT['status'] ?? null;
    
    if($id === null || $status === null) {
        echo json_encode(false);
        return;
    }

    if($status === 0) {
        $status = 1;
    } else {
        $status = 0;
    }


    $stmt = $db->prepare('UPDATE tasks SET `status` = :status WHERE `id` = :id');
    $stmt->execute([
        ':id' => $id,
        ':status' => $status,
    ]);

    return;
}

if($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    $id = $_GET['id'] ?? null;

    if($id === null) {
        echo json_encode(false);
        return;
    }

    $stmt = $db->prepare('DELETE FROM tasks WHERE `id` = :id');
    $stmt->execute([
        ':id' => $id,
    ]);

    return;
}