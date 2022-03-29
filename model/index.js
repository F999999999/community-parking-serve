const { query } = require("../db/query");
// 分页查询出租车位列表
module.exports.getRentlist = async (page = 1, limit = 6) => {
  return await query(
    `SELECT rentlist.id,carport.state,rentlist.starttime,rentlist.endtime,community.comname,community.place,carport.pname FROM rentlist INNER JOIN community ON rentlist.comid=community.id INNER JOIN carport ON rentlist.pid=carport.id LIMIT ?,?`,
    [(page - 1) * limit, Number(limit)]
  );
};
// 查询出租车位列表总数
module.exports.getRentlistCount = async () => {
  return await query(
    "SELECT count(*) AS total FROM rentlist INNER JOIN community ON rentlist.comid=community.id INNER JOIN carport ON rentlist.pid=carport.id"
  );
};
// 分页查询寻找车位列表
module.exports.getSeeklist = async (page = 1, limit = 6) => {
  return await query(
    `SELECT seeklist.id,seeklist.state,seeklist.starttime,seeklist.endtime,community.comname,community.place,car.cname FROM seeklist INNER JOIN community ON seeklist.comid=community.id INNER JOIN car ON seeklist.cid=car.id LIMIT ?,?`,
    [(page - 1) * limit, Number(limit)]
  );
};
// 查询寻找车位列表总数
module.exports.getSeeklistCount = async () => {
  return await query(
    "SELECT count(*) AS total FROM seeklist INNER JOIN community ON seeklist.comid=community.id INNER JOIN car ON seeklist.cid=car.id"
  );
};
// 根据用户Id查询车位信息
module.exports.getCarportByUserID = async (id) => {
  return await query(
    "SELECT c.id,pname,state,comname,place,cid FROM carport AS c,community AS com WHERE c.comid = com.id AND uid = ?",
    [id]
  );
};
// 根据用户id查询车信息
module.exports.getCarInfoByUserID = async (id) => {
  return await query("SELECT id,cname,pid FROM car WHERE uid=?", [id]);
};
