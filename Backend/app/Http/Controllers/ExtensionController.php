<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ExtensionController extends Controller
{
    //extension mysql is on check
    public function mysqliOn()
    {
        if (extension_loaded('mysqli'))
            return true;
    }
    //extension curl is on check
    public function curlOn()
    {
        if (extension_loaded('curl'))
            return true;
    }
    //extension mbstring is on check
    public function mbstringOn()
    {
        if (extension_loaded('mbstring'))
            return true;
    }
    //extension xml is on check
    public function xmlOn()
    {
        if (extension_loaded('xml'))
            return true;
    }
    //extension gdon is on check
    public function gdOn()
    {
        if (extension_loaded('gd'))
            return true;
    }
    //extension fopeno is on check
    public function allowUrlFopenOn()
    {
        if (ini_get('allow_url_fopen'))
            return true;
    }
    //extension openssl is on check
    public function openSSLPhpExtensionOn()
    {
        if (extension_loaded('openssl'))
            return true;
    }
    //extension pdo is on check
    public function pdoPhpExtensionOn()
    {
        if (extension_loaded('pdo'))
            return true;
    }
    //extension pdo_mysql is on check
    public function bcMathPhpExtensionOn()
    {
        if (extension_loaded('bcmath'))
            return true;
    }
    //extension pdo_mysql is on check
    public function ctypePhpExtensionOn()
    {
        if (extension_loaded('ctype'))
            return true;
    }
    //extension json is on check
    public function jsonPhpExtensionOn()
    {
        if (extension_loaded('json'))
            return true;
    }
    //extension fileinfophp is on check
    public function fileinfoPhpExtensionOn()
    {
        if (extension_loaded('fileinfo'))
            return true;
    }
    //extension tokenizer is on check
    public function tokenizerPhpExtensionOn()
    {
        if (extension_loaded('tokenizer'))
            return true;
    }
    public function internetConnectionOn()
    {
        $connected = @fsockopen("www.google.com", 80);
        if ($connected)
            return true;
    }
}
