<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use phpDocumentor\Reflection\Types\Boolean;

use function PHPSTORM_META\map;

class taskController extends Controller
{
    public function index()
    {
        $tasks = Task::all();

        if ($tasks->isEmpty()) {
            $data = [
                'message' => 'No se econtraron tareas',
                'status' => 404
            ];
            return response()->json($data, 200);
        }

        $data = [
            'tasks' => $tasks,
            'status' => 200
        ];

        return response()->json($data, 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|max:255',
            'state' => 'required|in:pending,in_progress,completed',
            'text' => 'required'
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validacion de datos',
                'errors' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($data, 400);
        }

        $task = Task::create([
            'title' => $request->title,
            'state' => $request->state,
            'text' => $request->text
        ]);

        if (!$task) {
            $data = [
                'message' => 'Error al crear la tarea',
                'status' => 500
            ];
            return response()->json($data, 500);
        }

        $data = [
            'task' => $task,
            'status' => 201
        ];

        return response()->json($data, 201);
    }

    public function show($id)
    {
        $task = Task::find($id);

        if (!$task) {
            $data = [
                'message' => 'No se encontró la tarea',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $data = [
            'task' => $task,
            'status' => 200
        ];

        return response()->json($data, 200);
    }

    public function destroy($id)
    {
        $task = Task::find($id);

        if (!$task) {
            $data = [
                'message' => 'No se encontró la tarea',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $task->delete();

        $data = [
            'message' => 'Tarea eliminada correctamente',
            'status' => 200
        ];

        return response()->json($data, 200);
    }

    public function update($id, Request $request)
    {
        $task = Task::find($id);

        if (!$task) {
            $data = [
                'message' => 'No se encontró la tarea',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required|max:255',
            'state' => 'required|in:pending,in_progress,completed',
            'text' => 'required'
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validacion de datos',
                'errors' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($data, 400);
        }

        $task->title = $request->title;
        $task->state = $request->state;
        $task->text = $request->text;
        $task->save();

        $data = [
            'message' => 'Tarea actualizado exitosamente',
            'task' => $task,
            'status' => 200
        ];

        return response()->json($data, 200);
    }

    public function updateField($id, Request $request)
    {
        $task = Task::find($id);

        if (!$task) {
            $data = [
                'message' => 'No se encontró la tarea',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'max:255',
            'state' => 'in:pending,in_progress,completed',
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validacion de datos',
                'errors' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($data, 400);
        }

        if ($request->has('title')) {
            $task->title = $request->title;
        }
        if ($request->has('state')) {
            $task->state = $request->state;
        }
        if ($request->has('text')) {
            $task->text = $request->text;
        }

        $task->save();

        $data = [
            'message' => 'Propiedad de la tarea actualizada',
            'task' => $task,
            'status' => 200
        ];
        return response()->json($data, 200);
    }

    public function filterByStatus(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'state' => 'required|in:all,pending,in_progress,completed',
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validacion de estados',
                'errors' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($data, 400);
        }

        if ($request->state === 'all') {
            $tasks = Task::all();

            $data = [
                'tasks' => $tasks,
                'status' => 200
            ];
    
            return response()->json($data, 200);
        }


        $tasks = Task::where('state', $request->state)->get();

        if ($tasks->isEmpty()) {
            $data = [
                'message' => 'No se encontraron tareas con el estado ' . $request,
                'status' => 404
            ];
            return response()->json($data, 200);
        }

        $data = [
            'tasks' => $tasks,
            'status' => 200
        ];

        return response()->json($data, 200);
    }

    public function getPriority($state)
    {
        if ($state === 'pending') {
            return 1;
        } elseif ($state === 'in_progress') {
            return 2;
        } elseif ($state === 'completed') {
            return 3;
        } else {
            return 4;
        }
    }

    public function sortByStatus(Request $request)
    {
        $tasks = Task::all();

        if ($tasks->isEmpty()) {
            $data = [
                'message' => 'No se econtraron tareas',
                'status' => 404
            ];
            return response()->json($data, 200);
        }
        
        $validator = Validator::make($request->all(), [
            'order' => 'required|in:asc,desc',
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validacion de ordenamiento',
                'errors' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($data, 400);
        }

        $newTasks = $tasks->map(function ($task) {
            $task->order = $this->getPriority($task->state);
            return $task;
        });
        
        $sortedTasks = ($request->order === 'asc')
        ? $newTasks->sortBy('order')  
        : $newTasks->sortByDesc('order');
        
        $data = [
            'tasks' => $sortedTasks->values()->all(),
            'status' => 200
        ];
    
        return response()->json($data, 200);
    }
}
