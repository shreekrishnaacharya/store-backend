<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace app\modules\store\models;

use Yii;

/**
 * Description of Dashboard
 *
 * @author krishna
 */
class Dashboard
{

        const REPORT_TODAY = 0;
        const REPORT_WEEK = 1;
        const REPORT_MONTH = 2;
        const REPORT_YEAR = 3;

        private $fromDate;
        private $toDate;
        public $userid = null;
        public $reportRange;


        public function __construct($user = null)
        {
                $this->userid = $user;
                $this->reportRange = self::REPORT_TODAY;
        }

        public function setDate($from, $to)
        {
                $this->fromDate = $from;
                $this->toDate = $to;
        }

        public function getReportRange()
        {
                return [
                        self::REPORT_TODAY => "Today",
                        self::REPORT_WEEK => "This Week",
                        self::REPORT_MONTH => "This Month",
                        self::REPORT_YEAR => "This Year"
                ];
        }

        public function getReportDate($report = self::REPORT_TODAY)
        {
                $this->toDate = time();
                $this->fromDate = strtotime("-1day");
                switch ($report) {
                        case self::REPORT_TODAY:
                                $this->fromDate = strtotime("-1day");
                                $this->reportRange = self::REPORT_TODAY;
                                break;
                        case self::REPORT_WEEK:
                                $this->fromDate = strtotime("-7days");
                                $this->reportRange = self::REPORT_WEEK;
                                break;
                        case self::REPORT_MONTH:
                                $this->fromDate = strtotime("-1month");
                                $this->reportRange = self::REPORT_MONTH;
                                break;
                        case self::REPORT_YEAR:
                                $this->fromDate = strtotime("-1year");
                                $this->reportRange = self::REPORT_YEAR;
                                break;
                }
        }

        public function getSales()
        {
                $query = "SELECT SUM(total_amt) as amt,sts from sales GROUP BY sts";
                return Yii::$app->db->createCommand($query)
                        ->queryAll();
        }

        public function getPurchase()
        {
                $query = "SELECT SUM(total_amt) as amt,sts from purchase GROUP BY sts";
                return Yii::$app->db->createCommand($query)
                        ->queryAll();
        }

        public function getPurchasePay()
        {
                $query = "SELECT SUM(amt) as amt from purchase_pay";
                return Yii::$app->db->createCommand($query)
                        ->queryOne();
        }

        public function getSalesPay()
        {
                $query = "SELECT SUM(amt) as amt from sales_pay";
                return Yii::$app->db->createCommand($query)
                        ->queryOne();
        }

        public function getSalesLine()
        {
                $query = "SELECT SUM(total_amt) as amt,DATE_FORMAT(`cat`, '%e %b %Y')as dat from sales WHERE sts!=3 GROUP BY dat";
                return Yii::$app->db->createCommand($query)
                        ->queryAll();
        }

        public function getPurchaseLine()
        {
                $query = "SELECT SUM(total_amt) as amt,DATE_FORMAT(`cat`, '%e %b %Y')as dat from purchase WHERE sts!=3 GROUP BY dat";
                return Yii::$app->db->createCommand($query)
                        ->queryAll();
        }

        public function getMiniCard()
        {
                $query = "SELECT SUM(customers) as customers,SUM(items) as items,SUM(vendors) as vendors FROM ("
                        . "(SELECT COUNT(id) as customers,0 as vendors,0 as items FROM custo)"
                        . " UNION "
                        . "(SELECT 0 as customers,COUNT(id) as vendors,0 as items FROM vend)"
                        . " UNION "
                        . "(SELECT 0 as customers,0 as vendors,COUNT(id) as items FROM itm)) as tb1";
                return Yii::$app->db->createCommand($query)
                        ->queryOne();
        }



        public function getDailyItems()
        {
                $query = "SELECT COUNT(id)as cnt,"
                        . "DATE_FORMAT(itm.cat, '%b') AS 'idate' "
                        . "FROM itm "
                        . "WHERE cat BETWEEN :fromdate AND :todate ";
                $query .= "GROUP BY idate ORDER BY idate ASC";
                return Yii::$app->db->createCommand($query)
                        ->bindValues([
                                ":fromdate" => date("Y-m-d", $this->fromDate),
                                ":todate" => date("Y-m-d", $this->toDate)
                        ])
                        ->queryAll();
        }

        public function getDailyContacts()
        {
                $query = "SELECT COUNT(id)as cnt,"
                        . "DATE_FORMAT(cont.cat, '%b') AS 'idate' "
                        . "FROM cont "
                        . "WHERE cat BETWEEN :fromdate AND :todate ";
                $query .= "GROUP BY idate ORDER BY idate ASC";
                return Yii::$app->db->createCommand($query)
                        ->bindValues([
                                ":fromdate" => date("Y-m-d", $this->fromDate),
                                ":todate" => date("Y-m-d", $this->toDate)
                        ])
                        ->queryAll();
        }

        public function getDailyCustomer()
        {
                $query = "SELECT COUNT(id)as cnt,"
                        . "DATE_FORMAT(custo.cat, '%b') AS 'idate' "
                        . "FROM custo "
                        . "WHERE cat BETWEEN :fromdate AND :todate ";
                $query .= "GROUP BY idate ORDER BY idate ASC";
                return Yii::$app->db->createCommand($query)
                        ->bindValues([
                                ":fromdate" => date("Y-m-d", $this->fromDate),
                                ":todate" => date("Y-m-d", $this->toDate)
                        ])
                        ->queryAll();
        }

        public function getDailyVendor()
        {
                $query = "SELECT COUNT(id)as cnt,"
                        . "DATE_FORMAT(vend.cat, '%b') AS 'idate' "
                        . "FROM vend "
                        . "WHERE cat BETWEEN :fromdate AND :todate ";
                $query .= "GROUP BY idate ORDER BY idate ASC";
                return Yii::$app->db->createCommand($query)
                        ->bindValues([
                                ":fromdate" => date("Y-m-d", $this->fromDate),
                                ":todate" => date("Y-m-d", $this->toDate)
                        ])
                        ->queryAll();
        }
}
