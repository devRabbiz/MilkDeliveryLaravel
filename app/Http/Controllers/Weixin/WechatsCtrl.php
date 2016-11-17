<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2015/11/9
 * Time: 15:05
 */

namespace App\Http\Controllers\Weixin; 
use App\Http\Controllers\Controller;
use App\Http\Controllers\Weixin\WechatesCtrl;
use App\Model\FactoryModel\Factory;

class WeChatsCtrl extends Controller
{   
    
    public function index()
    {
		if(isset($_GET['typesid'])){
			$typesid = $_GET['typesid'];
			$factory = Factory::where('id',$typesid)->first(); 
			$wechatObj = new WeChatesCtrl($factory->app_id, $factory->app_secret, $factory->app_encoding_key, $factory->app_token, $factory->name, $typesid);
			if (!isset($_GET['echostr'])) {
					$wechatObj->responseMsg();
			}else{
				$wechatObj->valid();
			}
		}
       
    }
	public function createMenus()
	{	
		$typesid = $_GET['typesid'];
		$factory = Factory::where('id',$typesid)->first(); 
		$wechatObj = new WeChatesCtrl($factory->app_id, $factory->app_secret, $factory->app_encoding_key, $factory->app_token, $factory->name, $typesid);
		$result = $wechatObj->createMenu();
		echo $result;
	}

     
}
