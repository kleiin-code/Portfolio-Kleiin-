<?php
// Incluir archivo de conexión
include('conexion.php');

// Verificar si el formulario ha sido enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recibir los datos del formulario con validación
    $nombre = filter_var($conexion->real_escape_string($_POST['nombre']), FILTER_SANITIZE_STRING);
    $email = filter_var($conexion->real_escape_string($_POST['email']), FILTER_SANITIZE_EMAIL);
    $asunto = filter_var($conexion->real_escape_string($_POST['asunto']), FILTER_SANITIZE_STRING);
    $mensaje = filter_var($conexion->real_escape_string($_POST['mensaje']), FILTER_SANITIZE_STRING);

    // Validar que los campos no estén vacíos
    if (empty($nombre) || empty($email) || empty($asunto) || empty($mensaje)) {
        echo json_encode(['status' => 'error', 'mensaje' => 'Todos los campos son obligatorios']);
        exit;
    }

    // Validar formato de email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['status' => 'error', 'mensaje' => 'El formato del email no es válido']);
        exit;
    }

    // Preparar la consulta SQL
    $sql = "INSERT INTO comentarios (nombre, email, asunto, mensaje, fecha_creacion) 
            VALUES (?, ?, ?, ?, NOW())";
    
    $stmt = $conexion->prepare($sql);
    
    if ($stmt) {
        $stmt->bind_param("ssss", $nombre, $email, $asunto, $mensaje);
        
        if ($stmt->execute()) {
            echo json_encode([
                'status' => 'success',
                'mensaje' => '¡Mensaje enviado correctamente! Nos pondremos en contacto pronto.'
            ]);
        } else {
            echo json_encode([
                'status' => 'error',
                'mensaje' => 'Error al enviar el mensaje: ' . $stmt->error
            ]);
        }
        
        $stmt->close();
    } else {
        echo json_encode([
            'status' => 'error',
            'mensaje' => 'Error en la preparación de la consulta: ' . $conexion->error
        ]);
    }

    $conexion->close();
} else {
    echo json_encode([
        'status' => 'error',
        'mensaje' => 'Método de acceso no permitido'
    ]);
}
?>
