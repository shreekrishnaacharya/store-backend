<?php

namespace app\Helpers;

class ImageHelper
{

    private $DestinationUrl = null;
    private $TempDestinationUrl = null;
    private $Size = null;
    private $ThumbSize = 0;
    private $FileName = null;
    public $_file = Null;
    private $ValidFormats = array("jpg", "png", "jpeg", "JPG", "JPEG", "gif");
    public $MaxSize = 5024000;
    public $isApi = false;

    public function getExtention()
    {
        if ($this->isApi) {
            return strtolower(pathinfo($this->_file["name"], PATHINFO_EXTENSION));
        }
        return strtolower(pathinfo($this->_file->name, PATHINFO_EXTENSION));
    }

    public function setImageType($type)
    {
        if (is_array($type)) {
            $this->ValidFormats = $type;
            return true;
        }
        return false;
    }

    public function setUploadSize($size)
    {
        $this->MaxSize = $size;
    }

    public function setImageFile($file)
    {
        $this->_file = $file;
    }

    public function getImageName()
    {
        return $this->FileName . "." . $this->getExtention();
    }

    public function setImageName($name)
    {
        $this->FileName = $name;
    }

    public function setCropSize($size)
    {
        $this->Size = $size;
    }

    public function setThumbCropSize($size)
    {
        $this->ThumbSize = $size;
    }

    public function setImageLocation($path)
    {
        if (!is_dir($path)) {
            mkdir($path, 0777, true);
        }
        $this->DestinationUrl = $path;
    }

    public function mkdir($path)
    {
        if (!is_dir($path)) {
            mkdir($path, 0777, true);
        }
    }

    public function setThumbImageLocation($path)
    {
        if (!is_dir($this->DestinationUrl . DIRECTORY_SEPARATOR . $path)) {
            //            mkdir($this->DestinationUrl . DIRECTORY_SEPARATOR . $path, 0777, true);
        }
        $this->TempDestinationUrl = $path;
    }

    public function base64image($img)
    {
        $result = "";
        try {
            $folderPath = "/tmp/";
            $image_parts = explode(";base64,", $img);
            $image_type_aux = explode("image/", $image_parts[0]);
            $image_type = $image_type_aux[1];

            $image_base64 = base64_decode($image_parts[1]);
            $fileName = uniqid() . '.' . $image_type;

            $file = $folderPath . $fileName;
            file_put_contents($file, $image_base64);
            $result = $file;
            $this->_file["error"] = 0;
            $this->_file["name"] = $fileName;
            $this->_file["size"] = filesize($file);
            $this->_file["tmp_name"] = $file;
            $this->isApi = true;
        } catch (\Exception $ex) {
            $result = false;
        }
        return $result;
    }

    public function upload()
    {
        if ($this->isApi) {
            return $this->uploadApi();
        }
        return $this->uploadNormal();
    }

    private function uploadApi()
    {
        $thumb_path = $this->TempDestinationUrl;
        $thumb_size = $this->ThumbSize;
        $data = array();
        $data["flag"] = FALSE;
        $data["file_type"] = NULL;
        $data["file_name"] = NULL;
        $data["file_id"] = NULL;
        $data["message"] = NULL;
        $data["width"] = 0;
        $data["height"] = 0;
        $data["file_id"] = $name = $this->_file["name"];
        $fileExtention = $this->getExtention();
        $data["file_type"] = $fileExtention;
        $data["file_name"] = $newName = $this->getImagename();
        if ($this->_file["error"] == 4) {
            $data["message"] = "Sorry, an unknown error occurs.";
        } else {
            if ($this->_file["size"] > $this->MaxSize) {
                $data["message"] = "$name is too large!." . $this->_file["size"];
            } elseif (!in_array($fileExtention, $this->ValidFormats)) {
                $data["message"] = "$name is not a valid format";
            } else {
                $compress = $this->compress_image($this->_file["tmp_name"], $this->DestinationUrl . DIRECTORY_SEPARATOR . $newName, $this->Size);
                if ($compress) {
                    $data["width"] = $compress["width"];
                    $data["height"] = $compress["height"];
                    if ($thumb_path != NULL && $thumb_size > 0) {
                        if ($this->compress_image($this->_file["tmp_name"], $this->DestinationUrl . DIRECTORY_SEPARATOR . $thumb_path . DIRECTORY_SEPARATOR . $newName, $thumb_size)) {
                            $data["message"] = "Upload Success";
                            $data["flag"] = TRUE;
                        } else {
                            $data["message"] = "Unable to upload " . $name;
                        }
                    } else {
                        $data["flag"] = TRUE;
                        $data["message"] = "Upload Success";
                    }
                } else {
                    $data["message"] = "Unable to upload " . $name;
                }
            }
        }
        return $data;
    }

    private function uploadNormal()
    {
        $thumb_path = $this->TempDestinationUrl;
        $thumb_size = $this->ThumbSize;
        $data = array();
        $data["flag"] = FALSE;
        $data["file_type"] = NULL;
        $data["file_name"] = NULL;
        $data["file_id"] = NULL;
        $data["message"] = NULL;
        $data["width"] = 0;
        $data["height"] = 0;
        $data["file_id"] = $name = $this->_file->name;
        $fileExtention = $this->getExtention();
        $data["file_type"] = $fileExtention;
        $data["file_name"] = $newName = $this->getImagename();
        if ($this->_file->error == 4) {
            $data["message"] = "Sorry, an unknown error occurs.";
        } else {
            if ($this->_file->size > $this->MaxSize) {
                $data["message"] = "$name is too large!." . $this->_file->size;
            } elseif (!in_array($fileExtention, $this->ValidFormats)) {
                $data["message"] = "$name is not a valid format";
            } else {
                $compress = $this->compress_image($this->_file->tempName, $this->DestinationUrl . DIRECTORY_SEPARATOR . $newName, $this->Size);
                if ($compress) {
                    $data["width"] = $compress["width"];
                    $data["height"] = $compress["height"];
                    if ($thumb_path != NULL && $thumb_size > 0) {
                        if ($this->compress_image($this->_file->tempName, $this->DestinationUrl . DIRECTORY_SEPARATOR . $thumb_path . DIRECTORY_SEPARATOR . $newName, $thumb_size)) {
                            $data["message"] = "Upload Success";
                            $data["flag"] = TRUE;
                        } else {
                            $data["message"] = "Unable to upload " . $name;
                        }
                    } else {
                        $data["flag"] = TRUE;
                        $data["message"] = "Upload Success";
                    }
                } else {
                    $data["message"] = "Unable to upload " . $name;
                }
            }
        }
        return $data;
    }

    public function deleteImage($ImageName)
    {
        $file = $this->DestinationUrl . DIRECTORY_SEPARATOR . $ImageName;
        if ($ImageName != NULL && $ImageName != '' && file_exists($file)) {
            unlink($file);
            return TRUE;
        }
        return FALSE;
    }

    private function compress_image($source_url, $destination_url, $size)
    {
        $error = TRUE;
        $data["height"] = 0;
        $data["width"] = 0;
        $info = getimagesize($source_url);
        if (!$info) {
            $error = false;
        } else {
            $ratio = $info[0] / $info[1];
            if ($ratio > 1) {
                $width = $size;
                $height = $size / $ratio;
            } else {
                $width = $size * $ratio;
                $height = $size;
            }
            $data["height"] = ceil($height);
            $data["width"] = ceil($width);
            $src = \imagecreatefromstring(file_get_contents($source_url));
            $dst = \imagecreatetruecolor($width, $height);
            if (!\imagecopyresampled($dst, $src, 0, 0, 0, 0, $width, $height, $info[0], $info[1])) {
                $error = false;
            } else {
                if (!imagedestroy($src)) {
                    $error = false;
                } else {
                    if ($this->getExtention() == "png") {
                        if (!imagepng($dst, $destination_url)) {
                            $error = false;
                        } else {
                            if (!imagedestroy($dst)) {
                                $error = false;
                            }
                        }
                    } else {
                        if (!imagejpeg($dst, $destination_url)) {
                            $error = false;
                        } else {
                            if (!imagedestroy($dst)) {
                                $error = false;
                            }
                        }
                    }
                }
            }
        }
        return $error ? $data : $error;
    }
}
