<?php

namespace App\Http\Controllers;

use Carbon\Carbon;

//controller added
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use App\Http\Controllers\EnvController;
use Illuminate\Support\Facades\Session;
use App\Http\Controllers\LicenseController;
//model added
use App\Http\Controllers\VersionController;
//other access
use App\Http\Controllers\ExtensionController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\VerificationController;
use App\Http\Controllers\DatabaseSetupController;
use Illuminate\Support\Facades\Validator;

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
            $data = ['message' => 'Successfully go to Step-2 Page', 'requirementForStep1' => $request->requirementForStep1];
            return response()->json($data);
        }
    }
    public function step3(Request $request)
    {
        if (!$request->requirementForStep1)
            return response()->json(['message' => 'Requirement for Step 1 is not met'], 400);
        //verify purchase code

        $validateInput = Validator::make($request->all(), [
            'purchaseCode' => 'required',
            'evantoUsername' => 'required',
        ]);

        if ($validateInput->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation Error!',
                'errors' => $validateInput->errors()
            ], 401);
        }
        $purchaseCode = $request->purchaseCode;
        $evantoUsername = $request->evantoUsername;
        $verification = new VerificationController;
        $status = $verification->verify($purchaseCode, $evantoUsername);
        if ($status !== 200) {
            $requirementForStep2 = true;
            $data = [
                'message' => 'Successfully go to Step-3 Page',
                'requirementForStep1' => $request->requirementForStep1,
                'requirementForStep2' => $requirementForStep2,
                'status' => $status,
                'purchaseCode' => $purchaseCode,
                'evantoUsername' => $evantoUsername,
            ];

            return response()->json($data);
        }
        $requirementForStep2 = false;
        return response()->json(['error' => 'Purchase Code or CodeCanyon Username is not valid.'], 400);
    }
    public function step4(Request $request)
    {


        if (!$request->requirementForStep1)
            return response()->json(['message' => 'Requirement for Step 1 is not met'], 400);

        if (!$request->requirementForStep2)
            return response()->json(['message' => 'Requirement for Step 2 is not met'], 400);
        $validateInput = Validator::make($request->all(), [
            'appName' => 'required',
            'databaseName' => 'required',
            'hostName' => 'required',
            'databaseUserName' => 'required',
        ]);

        if ($validateInput->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation Error!',
                'errors' => $validateInput->errors()
            ], 401);
        }

        // env update
        $envInstance = new EnvController;
        $env_update = $envInstance->updateEnv([
            'DB_DATABASE' => $request->databaseName,
            'DB_USERNAME' => $request->databaseUserName,
            'DB_PASSWORD' => $request->dbPassword,
            'APP_NAME' => str_replace("_", " ", $request->appName),
            'APP_DEBUG' => 'false',
            'MAIL_USERNAME' => $request->mailUsername,
            'MAIL_PASSWORD' => $request->mailPassword,
            'MAIL_FROM_ADDRESS' => $request->mailAddress,
            // 'MAIL_PASSWORD' => $request->mailAppPassword,
        ]);
        $requirementForStep1 = $request->requirementForStep1;
        $requirementForStep2 = $request->requirementForStep2;
        $requirementForStep3 = true;
        $requirementForStep4 = false;
        $purchaseCode = $request->purchaseCode;
        $evantoUsername = $request->evantoUsername;

        $data = [
            'message' => 'Successfully go to Final Step Page',
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
            'status' => true,
            'message' => 'Successfully Installation Completed',
            'requirementForStep1' => $requirementForStep1,
            'requirementForStep2' => $requirementForStep2,
            'requirementForStep3' => $requirementForStep3,
            'requirementForStep4' => $requirementForStep4,
            'dbSetupStatus' => $dbSetupStatus,
            'today' => $today,
            'superAdmin' => $superAdmin,
            'password' => $password,
        ];

        return response()->json($data, 200);
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