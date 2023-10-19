<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EnvController extends Controller
{
    //env
    public function updateEnv($data = array())
    {
        if (count($data) > 0) {
            $env = file_get_contents(base_path() . '/.env');
            $env = preg_split('/\s+/', $env);
            ;
            foreach ((array) $data as $key => $value) {
                //checking is any white space in $value

                foreach ($env as $env_key => $env_value) {

                    $entry = explode("=", $env_value, 2);
                    if ($entry[0] == $key) {
                        $value = preg_match('/\s/', $value) ? '"' . $value . '"' : $value;
                        info($value);
                        $env[$env_key] = $key . "=" . $value;
                    } else {
                        $env[$env_key] = $env_value;
                    }
                }
            }
            $env = implode("\n", $env);
            file_put_contents(base_path() . '/.env', $env);
            return true;
        } else {
            return false;
        }
    }
}