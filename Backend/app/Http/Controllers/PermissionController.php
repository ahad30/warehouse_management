<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PermissionController extends Controller
{
    //permission
    public $envFilePathForCpanel;
    public $envFilePathForLocal;
    public $publicPathForCpanel;
    public $publicPathForLocal;
    public $storagePathForCpanel;
    public $storagePathForLocal;
    public $resourcesPathForCpanel;
    public $resourcesPathForLocal;
    //attch path
    public function __construct()
    {
        $this->envFilePathForCpanel = '/.env';
        $this->envFilePathForLocal = '../.env';
        $this->publicPathForCpanel = '/public';
        $this->publicPathForLocal = '../public';
        $this->storagePathForCpanel = '/storage';
        $this->storagePathForLocal = '../storage';
        $this->resourcesPathForCpanel = '/resources';
        $this->resourcesPathForLocal = '../resources';
    }
    //writeable env permission
    public function isWritableEnv()
    {
        if (is_writable($this->envFilePathForLocal) || is_writable($this->envFilePathForCpanel))
            return true;
    }
    //writeable public permission
    public function isPublicWritable()
    {
        if (is_writable($this->publicPathForLocal) || is_writable($this->publicPathForCpanel))
            return true;
    }
    //writeable storage permission
    public function isStorageWritable()
    {
        if (is_writable($this->storagePathForLocal) || is_writable($this->storagePathForCpanel))
            return true;
    }
    //writeable resources permission
    public function isResourcesWritable()
    {
        if (is_writable($this->resourcesPathForLocal) || is_writable($this->resourcesPathForCpanel))
            return true;
    }
}
