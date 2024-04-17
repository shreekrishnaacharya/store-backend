<?php

namespace app\controllers;

use Yii;
use yii\web\Response;

class ImageController extends \yii\web\Controller
{

    /**
     * @inheritdoc
     */
    protected $fileid_list = [
        "item" => "item",
        "contact" => "contact",
    ];
    protected $filech_type = null;

    public function actionIndex($name = "", $catch = 1)
    {
        $this->response->format = Response::FORMAT_HTML;

        $type = "";
        $altimage = "images/user.png";
        if (isset($_GET["ft"])) {
            $altimage = "images/user_th.png";
            $type = Yii::$app->request->get("ft") . "/";
        }

        $flag_id = true;
        if (!array_key_exists("fc", $_GET)) {
            throw new \yii\web\NotAcceptableHttpException("Not a valid image url");
        }
        foreach ($this->fileid_list as $fkey => $flist) {
            if (array_key_exists($fkey, $_GET) && $_GET["fc"] == $flist) {
                $flag_id = false;
                $this->filech_type = $fkey;
                break;
            }
        }
        if ($flag_id) {
            return false;
            //            throw new \yii\web\NotAcceptableHttpException("Not a valid image url");
        }
        $file_path = null;
        $altfile = null;
        switch ($_GET["fc"]) {
            case "item":
                $file_path = $this->items($type, $name, $altimage);
                break;
            case "contact":
                $file_path = $this->contact($type, $name, $altimage);
                break;
            default:
                $file_path = "images/page404.png";
        }
        $image = $file_path;
        $fileType = strtolower(pathinfo($image, PATHINFO_EXTENSION));
        $fileType = $fileType == 'pdf' ? 'application/pdf' : 'image/' . $fileType;
        $mtime = filemtime($image);
        $this->caching_headers($image, $mtime, $fileType);
    }


    function items($type, $name, $altimage)
    {
        $albumid = Yii::$app->request->get($this->filech_type);
        $altimage = "images/product.png";
        $file_path = PATH_TO_RESOURCE . "/items/$albumid/" . $type . $name;
        if (empty($name) || $name == "" || !file_exists($file_path)) {
            $file_path = $altimage;
        }
        return $file_path;
    }

    function contact($type, $name, $altimage)
    {
        $albumid = Yii::$app->request->get($this->filech_type);
        $file_path = PATH_TO_RESOURCE . "/contact/$albumid/" . $type . $name;
        if (empty($name) || $name == "" || !file_exists($file_path)) {
            $file_path = $altimage;
        }
        // var_dump($altimage,$file_path);
        // die;
        return $file_path;
    }

    function caching_headers($file, $timestamp, $fileType)
    {
        $gmt_mtime = gmdate('r', $timestamp);
        $etag = md5($timestamp . $file);
        header('ETag: "' . $etag . '"');
        header('Last-Modified: ' . $gmt_mtime);
        header("Content-type: " . $fileType);
        header('Cache-Control: public');
        if (isset($_SERVER['HTTP_IF_MODIFIED_SINCE']) || isset($_SERVER['HTTP_IF_NONE_MATCH'])) {
            if ($_SERVER['HTTP_IF_MODIFIED_SINCE'] == $gmt_mtime || str_replace('"', '', stripslashes($_SERVER['HTTP_IF_NONE_MATCH'])) == $etag) {
                header("HTTP/1.0 304 Not Modified", true, 304);
                header('HTTP/1.1 304 Not Modified');
                exit();
            }
        }
        echo implode("", file($file));
        exit();
    }

    private function getCreate($foto)
    {
        $insert2 = null;
        $image_info = getimagesize($foto); // see EXIF for faster way
        switch ($image_info['mime']) {
            case 'image/gif':
                if (imagetypes() & IMG_GIF) { // not the same as IMAGETYPE
                    $insert2 = imageCreateFromGIF($foto);
                } else {
                    $ermsg = 'GIF images are not supported<br />';
                }
                break;
            case 'image/jpeg':
                if (imagetypes() & IMG_JPG) {
                    $insert2 = imageCreateFromJPEG($foto);
                } else {
                    $ermsg = 'JPEG images are not supported<br />';
                }
                break;
            case 'image/png':
                if (imagetypes() & IMG_PNG) {
                    $insert2 = imageCreateFromPNG($foto);
                } else {
                    $ermsg = 'PNG images are not supported<br />';
                }
                break;
            case 'image/wbmp':
                if (imagetypes() & IMG_WBMP) {
                    $insert2 = imageCreateFromWBMP($foto);
                } else {
                    $ermsg = 'WBMP images are not supported<br />';
                }
                break;
            default:
                $ermsg = $image_info['mime'] . ' images are not supported<br />';
                break;
        }
        if ($insert2 == null) {
            throw new \yii\web\HttpException(400, "Invalid image file :" . $foto);
        }
        return $insert2;
    }

    private function getCollectionImage($name)
    {
        $ext = strtolower(pathinfo($name, PATHINFO_EXTENSION));
        switch ($ext) {
            case "jpg":
            case "png":
            case "jpeg":
                return "collection_image.png";
            case "mp4":
                return "collection_mp4.png";
            case "pdf":
                return "collection_pdf.png";
            case "doc":
            case "docx":
            case "docm":
                return "collection_doc.png";
            case "ppt":
            case "pptx":
                return "collection_ppt.png";
            case "xls":
            case "xlsx":
            case "xlsm":
                return "collection_xls.png";
        }
        return "collection_file.png";
    }
}
