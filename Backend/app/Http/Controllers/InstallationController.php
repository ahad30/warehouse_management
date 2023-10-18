<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

//controller added
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\ExtensionController;
use App\Http\Controllers\VersionController;
use App\Http\Controllers\DatabaseSetupController;
use App\Http\Controllers\EnvController;
use App\Http\Controllers\LicenseController;
//model added
use App\Models\User;
//other aaccess
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Session;
use Carbon\Carbon;

class InstallationController extends Controller
{
    public function step1()
    {
        //Get Permission
        $permissions = new PermissionController;
        $envPermission = $permissions->isWritableEnv();
        $storagePermission = $permissions->isStorageWritable();
        $publicPermission = $permissions->isPublicWritable();
        $resourcesPermission = $permissions->isResourcesWritable();
        //Get PHP Version
        $version = new VersionController;
        $currentPhpVersion = $version->currentPhpVersion();
        $requiredPhpVersion = $version->requiredPhpVersion;
        //Get Extension
        $extension = new ExtensionController;
        $mysqli = $extension->mysqliOn();
        $curl = $extension->curlOn();
        $mbstring = $extension->mbstringOn();
        $xml = $extension->xmlOn();
        $gd = $extension->gdOn();
        $allowUrlFopen = $extension->allowUrlFopenOn();
        $openSSLPhpExtension = $extension->openSSLPhpExtensionOn();
        $pdoPhpExtension = $extension->pdoPhpExtensionOn();
        $bcMathPhpExtension = $extension->bcMathPhpExtensionOn();
        $ctypePhpExtension = $extension->ctypePhpExtensionOn();
        $jsonPhpExtension = $extension->jsonPhpExtensionOn();
        $tokenizerPhpExtension = $extension->tokenizerPhpExtensionOn();
        $fileinfoPhpExtension = $extension->fileinfoPhpExtensionOn();
        $internetConnection = $extension->internetConnectionOn();
        //Check Requirement
        if (($currentPhpVersion >= $requiredPhpVersion) && ($internetConnection && $mysqli && $curl && $mbstring && $xml && $gd && $allowUrlFopen && $openSSLPhpExtension && $pdoPhpExtension && $bcMathPhpExtension && $ctypePhpExtension && $jsonPhpExtension && $tokenizerPhpExtension && $fileinfoPhpExtension))
            $requirementForStep1 = true;
        else
            $requirementForStep1 = false;

        // Create an array with your data
        $data = [
            'envPermission' => $envPermission,
            'storagePermission' => $storagePermission,
            'publicPermission' => $publicPermission,
            'resourcesPermission' => $resourcesPermission,
            'currentPhpVersion' => $currentPhpVersion,
            'requiredPhpVersion' => $requiredPhpVersion,
            'mysqli' => $mysqli,
            'curl' => $curl,
            'mbstring' => $mbstring,
            'xml' => $xml,
            'gd' => $gd,
            'allowUrlFopen' => $allowUrlFopen,
            'openSSLPhpExtension' => $openSSLPhpExtension,
            'pdoPhpExtension' => $pdoPhpExtension,
            'bcMathPhpExtension' => $bcMathPhpExtension,
            'ctypePhpExtension' => $ctypePhpExtension,
            'jsonPhpExtension' => $jsonPhpExtension,
            'tokenizerPhpExtension' => $tokenizerPhpExtension,
            'fileinfoPhpExtension' => $fileinfoPhpExtension,
            'requirementForStep1' => $requirementForStep1,
            'internetConnection' => $internetConnection,
        ];

        // Return the data as JSON response
        return response()->json($data);
    }
    public function step2(Request $request)
    {
        if (!$request->requirementForStep1) {
            return response()->json(['message' => 'Requirement for Step 1 is not met'], 400);
        } else {
            $data = ['message' => 'Succesfully go to Step-2 Page', 'requirementForStep1' => $request->requirementForStep1];
            return response()->json($data);
        }
    }
    public function step3(Request $request)
    {
        if (!$request->requirementForStep1)
            return response()->json(['message' => 'Requirement for Step 1 is not met'], 400);
        //verify purchase code
        $request->validate([
            'purchaseCode' => 'required',
            'evantoUsername' => 'required',
        ]);
        $purchaseCode = $request->purchaseCode;
        $evantoUsername = $request->evantoUsername;
        $verification = new VerificationController;
        $status = $verification->verify($purchaseCode, $evantoUsername);
        if ($status == 200) {
            $requirementForStep2 = true;
            $data = [
                'message' => 'Succesfully go to Step-3 Page',
                'requirementForStep1' => $request->requirementForStep1,
                'requirementForStep2' => $requirementForStep2,
                'status' => $status,
                'purchaseCode' => $purchaseCode,
                'evantoUsername' => $evantoUsername,
            ];

            return response()->json($data);
        }
        $requirementForStep2 = false;
        return response()->json(['error' => 'Purchase Code or Envato Username is not valid.'], 400);
    }
    public function step4(Request $request)
    {
        if (!$request->requirementForStep1)
            return response()->json(['message' => 'Requirement for Step 1 is not met'], 400);

        if (!$request->requirementForStep2)
            return response()->json(['message' => 'Requirement for Step 2 is not met'], 400);

        $request->validate([
            'appName' => 'required',
            'databaseName' => 'required',
            'hostName' => 'required',
            'dbUsername' => 'required',
        ]);
        // env update
        $envInstance = new EnvController;
        $env_update = $envInstance->updateEnv([
            'DB_DATABASE'   => $request->databaseName,
            'DB_USERNAME'   => $request->dbUsername,
            'DB_PASSWORD'   => $request->dbPassword,
            'APP_NAME'      => $request->appName,
            'APP_DEBUG'     => 'false',
            'MAIL_USERNAME' => $request->mailUsername,
            'MAIL_PASSWORD' => $request->mailPassword,
            'MAIL_FROM_ADDRESS' => $request->mailAddress,
            'MAIL_PASSWORD' => $request->mailAppPassword,
        ]);
        $requirementForStep1 = $request->requirementForStep1;
        $requirementForStep2 = $request->requirementForStep2;
        $requirementForStep3 = true;
        $requirementForStep4 = false;
        $purchaseCode = $request->purchaseCode;
        $evantoUsername = $request->evantoUsername;

        $data = [
            'message' => 'Succesfully go to Final Step Page',
            'requirementForStep1' => $requirementForStep1,
            'requirementForStep2' => $requirementForStep2,
            'requirementForStep3' => $requirementForStep3,
            'requirementForStep4' => $requirementForStep4,
            'purchaseCode' => $purchaseCode,
            'evantoUsername' => $evantoUsername,
        ];

        return response()->json($data);
    }
    public function finalStep(Request $request)
    {
        if (!$request->requirementForStep1)
            return response()->json(['message' => 'Requirement for Step 1 is not met'], 400);

        if (!$request->requirementForStep2)
            return response()->json(['message' => 'Requirement for Step 2 is not met'], 400);

        if (!$request->requirementForStep3)
            return response()->json(['message' => 'Requirement for Step 3 is not met'], 400);

        //Create Database

        $dbSetup = new DatabaseSetupController;
        $dbSetupStatus = $dbSetup->setUpSQL();
        $today = Carbon::now()->toDateTimeString();
        $superAdmin = User::find(1)->first();
        try {
            $password = Crypt::decrypt($superAdmin->password);
        } catch (\Exception $e) {
            $password = '12345678';
        }
        $requirementForStep1 = $request->requirementForStep1;
        $requirementForStep2 = $request->requirementForStep2;
        $requirementForStep3 = $request->requirementForStep3;
        $requirementForStep4 = true;
        $license = new LicenseController;
        $license->createLicense($request->purchaseCode, $request->evantoUsername);
        $data = [
            'message' => 'Succesfully Installation Completed',
            'requirementForStep1' => $requirementForStep1,
            'requirementForStep2' => $requirementForStep2,
            'requirementForStep3' => $requirementForStep3,
            'requirementForStep4' => $requirementForStep4,
            'dbSetupStatus' => $dbSetupStatus,
            'today' => $today,
            'superAdmin' => $superAdmin,
            'password' => $password,
        ];

        return response()->json($data);
    }
    public function alreadyInstall()
    {
        if (file_exists('../license.txt')) {
            $data = ['message' => 'Already Installed'];
            return response()->json($data);
        } else {
            $data = ['message' => 'Not Installed'];
            return response()->json($data);
        }
    }
}
