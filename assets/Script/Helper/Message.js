"use strict";
var o;
function n(t, e, i) {
	return e in t ? Object.defineProperty(t, e, {
		value: i,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : t[e] = i,
	t
}

var s = (n(o = {
	TITLE_SUCCESS: "Thành công",
	TITLE_FAILED: "Lỗi",
	TIME_OUT_LOADING: "Có lỗi trong quá trình thực hiện, vui lòng thử lại",
	CONNECT_SFS_ERROR: "Không thể kết nối tới Server",
	MISSING_INFO: "Vui lòng nhập đầy đủ các thông tin",
	SUCCESS: "Thành công",
	FAILURE: "Thất bại",
	VERSION: "Phiên bản: {0}",
	CONTACT: "{0}",
	OTP_FIRST_ACCOUNT: "Kích hoạt số điện thoại bảo mật để bảo vệ tài khoản bạn nhé!",
	OTP_ACTIVE_ACCOUNT: "Vui lòng soạn tin <color=yellow>{0}</color> gửi <color=yellow>{1}</color> để kích hoạt OTP",
	OTP_FORGET_PASSWORD: "Bước 1: Soạn tin <color=yellow>{0}</color> gửi <color=yellow>{1}</color> để lấy mã xác thực",
	LOGIN_TITLE: "Đăng nhập",
	LOGIN_MISSING_USERNAME: "Thiếu thông tin tài khoản",
	LOGIN_MISSING_PASSWORD: "Thiếu thông tin mật khẩu",
	LOGIN_MISSING_CAPTCHA: "Thiếu thông tin mã xác nhận",
	LOGIN_SECURITY_SMS: "Để đăng ký bảo mật đăng nhập vui lòng soạn tin <color=yellow>{0}</color> gửi <color=yellow>{1}</color>\nĐể hủy bảo mật đăng nhập vui lòng soạn tin <color=yellow>{2}</color> gửi <color=yellow>{3}</color>",
	LOGIN_SECURITY_SMS_2: "Soạn tin <color=yellow>{0}</color> gửi <color=yellow>{1}</color> để lấy mã OTP",
	SECURITY_GAME: "Quản lý game",
	TIME_LOGIN: "Bạn đã đăng nhập quá nhiều\nVui lòng thử lại sau ít phút",
	REGISTER_TITLE: "Đăng ký",
	REGISTER_MISSING_USERNAME: "Vui lòng nhập tên tài khoản",
	REGISTER_MISSING_PASSWORD: "Vui lòng nhập mật khẩu",
	REGISTER_MISSING_REPASSWORD: "Vui lòng nhập mật khẩu xác nhận",
	REGISTER_REPASSWORD_NOT_CORRECT: "Nhập lại mật khẩu chưa chính xác. Vui lòng thử lại",
	REGISTER_NOT_AGREE_TERM: "Vui lòng xác nhận lại các điều khoản sử dụng",
	FORGET_PASSWORD_TITLE: "Quên mật khẩu",
	FORGET_PASSWORD_MISSING_USERNAME_EMAIL: "Vui lòng nhập đầy đủ tên tài khoản và Email",
	FORGET_PASSWORD_NOT_SUPPORT_FORGET_PASSWORD_BY_PHONE: "Chúng tôi hiện chưa hỗ trợ lấy lại mật khẩu bằng số điện thoại",
	FORGET_PASSWORD_SUCCESS: "Gửi email thành công. Vui lòng kiểm tra email để lấy thông tin về mật khẩu mới",
	FORGET_PASSWORD_RE_PASSWORD_NOT_CORRECT: "Mật khẩu xác nhận không chính xác",
	CHANGE_PASSWORD_TITLE: "Đổi mật khẩu",
	CHANGE_PASSWORD_RE_PASSWORD_NOT_CORRECT: "Mật khẩu xác nhận không chính xác",
	CHANGE_PASSWORD_GET_OTP: "Bạn vui lòng sử dụng OTP App để nhận OTP hoặc liên hệ với QTV để biết thêm thông tin",
	SET_NICKNAME_TITLE: "Tạo nhân vật",
	SET_NICKNAME_NICKNAME_NOT_EMPTY: "Tên nhận vật không được trống",
	OTP_NOT_EMPTY: "Mã OTP không được phép trống",
	NICKNAME_DIFFERENT_USERNAME: "Tên nhân vật không được trùng với tài khoản",
	OTP_LOGIN_TITLE: "Bảo mật đăng nhập",
	REGISTER_GIFTCODE_WELCOME: "Xin chào <color=yellow>{0}</color>",
	UPDATE_DIAMOND: "Bạn được tặng KIM CƯƠNG. Xem ngay tại SỰ KIỆN LÊN ĐỜI SIÊU XE",
	LOGOUT_TITLE: "Đăng xuất",
	UPDATE_INFO: "Cập nhật thông tin cá nhân",
	UPDATE_AVATAR_TITLE: "Đổi avatar",
	UPDATE_PASSWORD_TITLE: "Đổi mật khẩu",
	FORMAT_PHONE_NOT_CORRECT: "Định dạng số điện thoại không chính xác",
	FORMAT_DOB_NOT_CORRECT: "Định dạng ngày sinh không chính xác",
	FORMAT_EMAIL_NOT_CORRECT: "Định dạng Email không chính xác",
	INFO_DOB: "{0}/{1}/{2}",
	PLAYER_INFO_TITLE: "Thông tin người chơi",
	MAIL_TITLE: "Hòm thư",
	MAIL_DETAIL_TITLE: "Nguời gửi: {0} - Thời gian: {1}",
	MAIL_NOTIFICATION: "Bạn có tin nhắn mới",
	RECHARGE_MONEY_SUCCESS: "Bạn đã nạp thành công {0} {1}",
	RECHARGE_MONEY_TITLE: "Nạp thẻ",
	RECHARGE_MONEY_HISTORY_NAME: "Nạp thẻ {0}",
	RECHARGE_MONEY_HISTORY_NOTE: "Code: {0} - Seri: {1}",
	NUMBER_MONEY_LARGER_ZERO: "Số KAY phải > 0",
	RECHARGE_GOLD_SUCCESS: "Đổi thành công",
	RECHARGE_GOLD_TITLE: "Đổi Xu",
	RECHARGE_GOLD_HISTORY_NAME: "Đổi Xu",
	RECHARGE_GOLD_HISTORY_NOTE: "Số Xu nhận được: {0}",
	RECHARGE_SMS_NOTE: "<color=#A17E1A><i>Nạp {0} nhận ngay {1} KAY</i></c>",
	RECHARGE_SMS_MSG: "Soạn <color=yellow>{0}</color> gửi <color=green>{1}</color>",
	RECHARGE_SMS_TENDANGNHAP: "tendangnhap",
	RECHARGE_SMS_HISTORY_NAME: "Nạp SMS",
	RECHARGE_BANKING_TITLE: "Nạp Banking",
	AWARD_TITLE: "Đổi thưởng",
	AWARD_DESCRIBE: "Đổi thẻ {0}",
	NUMBER_CARDS_LARGER_ZERO: "Số lượng thẻ phải > 0",
	TRANSFER_TITLE: "Chuyển khoản",
	VALUE_LARGER_ZERO: "Số KAY phải > 0",
	RE_NICKNAME_NOT_CORRECT: "Xác nhận nickname không chính xác",
	TRANSFER_LOCKED: "Chức năng chuyển khoản đang tạm khóa",
	TRANSFER_OTP: "Soạn tin <color=yellow>{0}</color> gửi <color=yellow>{1}</color>",
	SAFE_TITLE: "Két sắt",
	SAFE_NOT_ACTIVE_PHONE: "Vui lòng bảo mật tài khoản bằng Số điện thoại để rút tiền",
	SAFE_GET_OTP: "Soạn tin: <color = #F0FF40>{0}</color> gửi <color = #F0FF40>{1}</color> để lấy mã xác thực",
	HISTORY_TITLE: "Lịch sử",
	TOP_TITLE: "Bảng xếp hạng",
	GIFTCODE_TITLE: "Gift Code",
	GIFTCODE_NOT_ACTIVE: "Vui lòng bảo mật để sử dụng Gift Code",
	CAPCHA_NOT_CORRECT: "Mã xác nhận không chính xác",
	CHAT_MESSAGE: "<color=4bcaee><b>{0}: </b></color>{1}",
	CHAT_VIP_MESSAGE: "<color=4bcaee><b>{0}: </b></color>{1}",
	CHAT_MESSAGE_FAIL: "<color=red><i>{0}</i></color>",
	CHAT_GAME_MESSAGE: "<color=fecb6e><b>{0}: </b></color>{1}",
	CHAT_TAI_XIU_MESSAGE: "<color=04fd4a><b>{0}: </b></color>{1}",
	CHAT_TAI_XIU_VIP_MESSAGE: "<color=04fd4a><b>{0}: </b></color>{1}",
	CHAT_SLOT_2_MESSAGE: "<color=#DE9100><b>{0}: </b></color><color=#C3C2C3>{1}</color>",
	TAIXIU_YOU_ONLE_BET_A_DOOR: "Bạn chỉ được đặt một cửa",
	JOIN_ROOM_TITLE: "Chọn phòng",
	NOT_ENOUGH_MONEY_TO_JOIN_GAME: "Bạn cần tối thiểu {0} {1} để tham gia chơi game",
	NOT_ENOUGH_MONEY_TO_STAY_GAME: "Bạn cần {0} {1} để tiếp tục chơi game!",
	JOIN_ROOM_ERROR: "Phòng chơi hiện tại đang bị khóa",
	INTIVE_TITLE: "Mời bạn",
	NOTIFICATION_TITLE: "Thông báo",
	MONEY: "KAY",
	GOLD: "XU",
	VIETTEL: "Vietel",
	MOBIFONE: "Mobifone",
	VINAPHONE: "Vinaphone",
	GATE: "Gate",
	TOP_UP_ITEM_VALUE: "Thẻ {0}",
	CHARGE_CARD_ITEM_VALUE: "{0}Đ",
	TAI_XIU: "Tài Xỉu",
	MINI_POKER: "Mini Poker",
	MINI_BACAY: "Mini Ba Cây",
	DIAMOND: "Zombies",
	BAU_CUA: "Bầu Cua",
	LUCK_WHEEL: "Vòng Quay May Mắn",
	TREN_DUOI: "Trên Dưới",
	DIAMOND_2: "Big Babol",
	SLOT4: "Vương Quốc KAY",
	BOM: "Thiên Hà",
	INVITE_MESSAGE: "Người chơi <color=green>{0}</color> mời bạn vào game <color=green>{1}</color>\nMức cược: <color=yellow>{2} {3}</color>",
	GAME_DESCRIBE_TABLE_NAME: "{0} - Bàn {1} - Phiên chơi {2}",
	GAME_DESCRIBE_TABLE_BET: "Mức cược: {0} {1}",
	REQUEST_LEFT_ROOM: "Đăng ký rời bàn thành công",
	IGNORE_REQUEST_LEFT_ROOM: "Hủy rời bàn thành công",
	BACAY_WIN_ALL: "BẮT CẢ LÀNG",
	BACAY_LOSE_ALL: "PHÁT LƯƠNG",
	BACAY_BET_PRIVATE_BUTTON: "ĐÁNH BIÊN TẤT CẢ ({0})",
	MAU_BINH_BINH_LUNG_NOT_COMPLETE: "Binh lủng không thể hoàn thành",
	MAU_BINH_KHONG_HOP_LE: "KHÔNG HỢP LỆ",
	MAU_BINH_THUNG_PHA_SANH_LON: "THÙNG PHÁ SẢNH ĐẠI",
	MAU_BINH_THUNG_PHA_SANH: "THÙNG PHÁ SẢNH",
	MAU_BINH_TU_QUY: "TỨ QUÝ",
	MAU_BINH_CU_LU: "CÙ LŨ",
	MAU_BINH_THUNG: "THÙNG",
	MAU_BINH_SANH_DAI: "SẢNH ĐẠI",
	MAU_BINH_SANH_NHI: "SẢNH NHỊ",
	MAU_BINH_SANH_THUONG: "SẢNH",
	MAU_BINH_SAM: "SÁM",
	MAU_BINH_THU: "THÚ",
	MAU_BINH_DOI: "ĐÔI",
	MAU_BINH_MAU_THAU: "MẬU THẦU",
	MAU_BINH_COMPLETED: "HOÀN THÀNH",
	MAU_BINH_RONG_CUON: "RỒNG CUỐN",
	MAU_BINH_SANH_RONG: "SẢNH RỒNG",
	MAU_BINH_MUOI_BA_LA_CUNG_MAU: "ĐỒNG HOA",
	MAU_BINH_NAM_DOI_MOT_SAM: "NĂM ĐÔI MỘT SÁM",
	MAU_BINH_LUC_PHE_BON: "LỤC PHÉ BÔN",
	MAU_BINH_BA_THUNG_TAI_BA_CHI: "BA THÙNG BA CHI",
	MAU_BINH_BA_SANH_TAI_BA_CHI: "BA SẢNH BA CHI",
	MAU_BINH_THUNG_PHA_SANH_CHI_DAU: "THÙNG PHÁ SẢNH CHI ĐẦU",
	MAU_BINH_TU_QUY_CHI_DAU: "TỨ QUÝ CHI ĐẦU",
	MAU_BINH_THUNG_PHA_SANH_CHI_GIUA: "THÙNG PHÁ SẢNH CHI GIỮA",
	MAU_BINH_TU_QUY_CHI_GIUA: "TỨ QUÝ CHI GIỮA",
	MAU_BINH_CU_LU_CHI_GIUA: "CÙ LŨ CHI GIỮA",
	MAU_BINH_SAM_CHI_CUOI: "SÁM CHI CUỐI",
	MAU_BINH_BINH_LUNG: "BINH LỦNG",
	MAU_BINH_SAP_BA_CHI: "SẬP BA CHI",
	MAU_BINH_THANG_BA_CHI: "THẮNG BA CHI",
	MAU_BINH_CHI_TYPE: "{0} . {1}",
	TLMN_IGNORE_TURN: "BỎ LƯỢT",
	TLMN_BA_DOI_THONG: "BA ĐÔI THÔNG",
	TLMN_BON_DOI_THONG: "BỐN ĐÔI THÔNG",
	TLMN_MOT_TU_QUY: "TỨ QUÝ",
	TLMN_CONG: "CÓNG",
	TLMN_THOI_HAI: "THỐI HAI",
	TLMN_THOI_BA_DOI_THONG: "THỐI BA ĐÔI THÔNG",
	TLMN_THOI_TU_QUY: "THỐI TỨ QUÝ",
	TLMN_THOI_BON_DOI_THONG: "THỐI BỐN ĐÔI THÔNG",
	TLMN_SANH_RONG: "SẢNH RỒNG",
	TLMN_SAU_DOI_THONG: "SÁU ĐÔI THÔNG",
	TLMN_BON_BO_BA: "BỐN BỘ BA",
	TLMN_HAI_BO_TU_QUY: "HAI BỘ TỨ QUÝ",
	TLMN_MUOI_HAI_CON_DONG_CHAT: "ĐỒNG HOA",
	TLMN_NAM_DOI_THONG: "NĂM ĐÔI THÔNG",
	TLMN_TU_HAI: "TỨ QUÝ HAI",
	TLMN_SAU_DOI: "SÁU ĐÔI",
	TLMN_CHAN_KET_BA_BICH: "CHẶN KẾT BA BÍCH",
	TLMN_KET_BA_BICH: "KẾT BA BÍCH",
	SAM_BAO_MOT: "BÁO 1",
	SAM_THANG_BAO_MOT: "THẮNG BÁO 1",
	SAM_THUA_BAO_MOT: "THUA BÁO 1",
	SAM_IGNORE_TURN: "BỎ LƯỢT",
	SAM_XIN_SAM: "XIN SÂM",
	SAM_CONG: "CÓNG",
	SAM_THOI_HAI: "THỐI HAI",
	SAM_THUA_SAM: "THUA SÂM",
	SAM_THANG_SAM: "THẮNG SÂM",
	POKER_CHECK: "XEM",
	POKER_FOLD: "BỎ BÀI",
	POKER_ALL_IN: "ALL IN",
	POKER_RAISE: "TỐ",
	POKER_CALL: "THEO",
	POKER_THUNG_PHA_SANH_LON: "THÙNG PHÁ SẢNH ĐẠI",
	POKER_THUNG_PHA_SANH: "THÙNG PHÁ SẢNH",
	POKER_TU_QUY: "TỨ QUÝ",
	POKER_CU_LU: "CÙ LŨ",
	POKER_THUNG: "THÙNG",
	POKER_SANH_DAI: "SẢNH ĐẠI",
	POKER_SANH_NHI: "SẢNH NHỊ",
	POKER_SANH_THUONG: "SẢNH",
	POKER_SAM: "SÁM",
	POKER_THU: "THÚ",
	POKER_DOI: "ĐÔI",
	POKER_BAI_CAO: "BÀI CAO",
	LIENG_CHECK: "XEM",
	LIENG_FOLD: "BỎ BÀI",
	LIENG_ALL_IN: "ALL IN",
	LIENG_RAISE: "TỐ",
	LIENG_CALL: "THEO",
	LIENG_SAP: "SÁP",
	LIENG_LIENG: "LIÊNG",
	LIENG_BO_DOI: "BỘ ĐỘI",
	LIENG_BET_TEXT: "{0} ({1})",
	XOC_DIA_REGISTER_FORM_MESSAGE_HOME: "Cái",
	XOC_DIA_REGISTER_FORM_MESSAGE_WAITING: "Đang chờ",
	XOC_DIA_REGISTER_FORM_MESSAGE_IGNORE: "Nghỉ làm cái",
	XOC_DIA_START_REGISTER_HOST: "Bắt đầu đăng ký làm host",
	XOC_DIA_WAIT_NEXT_GAME: "Chờ để bắt đầu ván chơi mới",
	XOC_DIA_START_BET: "Vui lòng đặt cược",
	XOC_DIA_BUY_SELL_DOOR: "Thời gian mua bán cửa",
	XOC_DIA_NOT_TIME_TO_BET: "Không phải thời gian để đặt cửa",
	XOC_DIA_NOT_SELECT_CHIP: "Bạn chưa chọn tiền cược",
	XOC_DIA_BALANCE_DOOR: "Cân cửa",
	XOC_DIA_RESULT: "Ván chơi kết thúc",
	XOC_DIA_NOT_BET_NO_HOST: "Không thể đặt cửa này khi không có Cái",
	XOC_DIA_HOST_NOT_BET: "Cái không thể đặt",
	XOC_DIA_ID: "#{0}",
	PHOM_SELECT_ONE_CARD: "Bạn chưa chọn bài",
	PHOM_PLEASE_BOC_BAI: "Bạn chưa bốc bài",
	PHOM_PLEASE_SELECT_CARDS_HA: "Vui lòng chọn phỏm cần hạ",
	PHOM_AN_CHOT: "ĂN CHỐT",
	PHOM_BI_AN_CHOT: "BỊ ĂN CHỐT",
	PHOM_U: "Ù",
	PHOM_U_KHAN: "Ù KHAN",
	PHOM_U_TRON: "Ù TRÒN",
	PHOM_U_DEN: "Ù ĐỀN",
	PHOM_DEN: "ĐỀN LÀNG",
	PHOM_NHAT: "NHẤT",
	PHOM_NHI: "NHÌ",
	PHOM_BA: "BA",
	PHOM_BET: "BÉT",
	PHOM_MOM: "MÓM",
	PHOM_SCORE: "{0} ĐIỂM",
	XITO_CHECK: "XEM",
	XITO_FOLD: "BỎ BÀI",
	XITO_ALL_IN: "ALL IN",
	XITO_RAISE: "TỐ",
	XITO_CALL: "THEO",
	XITO_THUNG_PHA_SANH: "THÙNG PHÁ SẢNH",
	XITO_TU_QUY: "TỨ QUÝ",
	XITO_CU_LU: "CÙ LŨ",
	XITO_THUNG: "THÙNG",
	XITO_SANH: "SẢNH",
	XITO_SAM: "SÁM",
	XITO_THU: "THÚ",
	XITO_DOI: "ĐÔI",
	XITO_BAI_CAO: "BÀI CAO",
	SLOT_NOT_CHANGE_BET: "Trạng thái hiện tại không thể thay đổi mức cược",
	SLOT_NOT_AUTO_SPIN: "Trạng thái hiện tại không thể tự động quay",
	SLOT_NOT_TEST: "Trạng thái hiện tại không thể chơi thử",
	SLOT_BONUS_GAME_FINISH: "Chúc mừng bạn nhận được <color=yellow>{0} KAY </color>",
	SLOT_CANCEL_BACK: "Vui lòng đợi vòng chơi kết thúc",
	SLOT_NOT_CHANGE_SELECT_LINE: "Trạng thái hiện tại không thể chọn dòng cược",
	PLAYING_NOT_CHANGE_BET: "Chờ hết lượt để đổi cửa đặt",
	PLAYING_NOT_CHANGE_MONEY_TYPE: "Chờ hết lượt để đổi loại tiền",
	AUTO_SPIN_NOT_CHANGE_BET: "Đang tự động quay không được thay đổi cửa đặt",
	AUTO_SPIN_NOT_CHANGE_MONEY_TYPE: "Đang tự động quay không được thay đổi loại tiền",
	SPIN_TOO_FAST: "Quay quá nhanh",
	GAME_STOP_SPIN: "Vui lòng chờ vòng quay kết thúc",
	MINIGAME_ID: "#{0}",
	TAIXIU_HISTORIES_DETAIL: "Phiên chơi {0} - {1}",
	TAIXIU_BALANCE_DOOR: "Trả tiền cân cửa",
	TAIXIU_YOU_NOT_BET: "Vui lòng nhập tiền cược",
	TAIXIU_CHAIN_WIN: "Chuỗi thắng: {0}",
	TAIXIU_CHAIN_LOSE: "Chuỗi thua: {0}",
	TRENDUOI_CLICK_PLAY: "Bấm vào PLAY để bắt đầu chơi",
	TRENDUOI_STOP_SPINING: "Vui lòng chờ vòng quay kết thúc",
	TRENDUOI_FINISH: "Kết thúc",
	TRENDUOI_LOSE: "Bạn đã thua. Chúc bạn may mắn lần sau",
	BAU_CUA_NEXT_TURN: "Lượt tiếp theo",
	BAU_CUA_BET: "Đặt cược",
	BAU_CUA_TOP_WEEK_TITLE: "Top tuần"
}, "TAIXIU_CHAIN_WIN", "Hiện tại: {0}"),
n(o, "TAIXIU_CHAIN_LOSE", "Hiện tại: {0}"),
n(o, "TAIXIU_CHAIN", "Sự kiện đua dây tài xỉu"),
n(o, "TAIXIU_CURRENT_CHAIN_WIN", "Dài nhất: {0}"),
n(o, "TAIXIU_CURRENT_CHAIN_LOSE", "Dài nhất: {0}"),
n(o, "DRAGON_TIGER_CHAIN_WIN", "Dài nhất: {0}"),
n(o, "DRAGON_TIGER_CHAIN_LOSE", "Dài nhất: {0}"),
n(o, "DRAGON_TIGER_CURRENT_CHAIN_WIN", "Hiện tại: {0}"),
n(o, "DRAGON_TIGER_CURRENT_CHAIN_LOSE", "Hiện tại: {0}"),
n(o, "DRAGON_TIGER_CHAIN", "Sự kiện đua dây long hổ"),
n(o, "DRAGON_TIGER_NO_BET_SELECTED", "Vui lòng chọn mức cược"),
n(o, "MINI_GAME_RANK_TITLE", "BẢNG XẾP HẠNG"),
n(o, "MINI_GAME_RANK_TITLE_TAI_XIU", "BẢNG XẾP HẠNG TÀI XỈU"),
n(o, "MINI_GAME_RANK_TITLE_CHAN_LE", "BẢNG XẾP HẠNG CHẴN LẺ"),
n(o, "DIAMOND_NO_LINE_SELECTED", "Bạn chưa chọn dòng đặt cược"),
n(o, "PIRATE_NO_LINE_SELECTED", "Bạn chưa chọn dòng đặt cược"),
n(o, "LUCKY_WHEEL_IS_SPINING", "Vui lòng chờ vòng quay kết thúc"),
n(o, "LUCKY_WHEEL_CONGRATULATION", "Chúc mừng bạn nhận được phần thưởng từ Vòng Quay May Mắn"),
n(o, "FIREFISH_MIN_BET", "MIN = {0} {1}"),
n(o, "FIREFISH_FISHED", "Người chơi <color=#FA3030>{0}</color> vừa giết chết <color=#56EA00>{1}</color> nhận được <color=#FAFF1A>{2}</color> {3}"),
n(o, "FORGET_PASSWORD_NOTIFICATION", "Vui lòng liên hệ với BQT qua Fanpage hoặc Hotline: 097 171 4012 để được hỗ trợ ngay bạn nhé!"),
n(o, "SLOT_NOT_CHANGE_SPIN", "Vui lòng đợi vòng chơi kết thúc"),
n(o, "SLOT2_NOT_SELECT_LINE", "Vui lòng chọn dòng cược."),
n(o, "SLOT2_AUTOSPIN_NOT_CHANGE", "Đang ở chế độ quay tự động. Bạn không thể thực hiện thao thác này"),
n(o, "SLOT2_RANK_1", "Chúc mừng <color = #F7A200>{0}</color> đã dành được Hũ <color = #F7A200>{1}</color> KAY vào lúc {2}"),
n(o, "SLOT2_RANK_2", "TK <color = #F7A200>{0}</color> thắng <color = #F7A200>{1}</color> KAY {2} trước"),
n(o, "SLOT2_HISTORY", "Bạn chơi phòng {0} và nhận được <color = #F7A200>{1}</color> {2} trước"),
n(o, "SLOT2_NOT_PLAY", "Vui lòng đợi vòng quay kết thúc"),
n(o, "SLOT3_NOT_SELECT_LINE", "Vui lòng chọn dòng cược."),
n(o, "SLOT3_AUTOSPIN_NOT_CHANGE", "Đang ở chế độ quay tự động. Bạn không thể thực hiện thao thác này"),
n(o, "SLOT3_RANK_1", "Chúc mừng <color = #F7A200>{0}</color> đã dành được hũ <color = #F7A200>{1}</color> KAY vào lúc {2}"),
n(o, "SLOT3_RANK_2", "TK <color = #F7A200>{0}</color> thắng <color = #F7A200>{1}</color> KAY {2} trước"),
n(o, "SLOT3_HISTORY", "Bạn chơi phòng {0} và nhận được <color = #F7A200>{1}</color> {2} trước"),
n(o, "MESSAGE_FORBIDDEN", ["napkay"]),
n(o, "SPLASH_GET_GET_DATA", "Đang lấy dữ liệu game ..."),
n(o, "SPLASH_GET_CONFIG_FAILED", "Lấy dữ liệu thất bại"),
n(o, "HOT_UPDATE_CHECKING_VERSION", "Đang kiểm tra phiên bản ..."),
n(o, "HOT_UPDATE_RETRY", "Thử lại ..."),
n(o, "HOT_UPDATE_NOT_FOUND", "Không tìm thấy Hot Update ..."),
n(o, "HOT_UPDATE_DOWNLOAD_MANIFEST_FAILED", "Tải manifest thất bại ..."),
n(o, "HOT_UPDATE_ALREADY_UP_TO_DATE", "Phiên bản mới nhất ..."),
n(o, "HOT_UPDATE_FOUND_UPDATE", "Tìm thấy phiên bản cập nhật ..."),
n(o, "HOT_UPDATE_UPDATING", "Đang cập nhật ..."),
n(o, "LOTTERY_NOT_NUMBER", "Vui lòng chọn số"),
n(o, "LOTTERY_NOT_BET", "Vui lòng chọn mức cược"),
n(o, "LOTTERY_SELECT_LO", "Chọn 1 số bất kỳ. Bạn sẽ thắng cược khi số đó có trong bảng kết quả"),
n(o, "LOTTERY_SELECT_DE", "Chọn 1 số bất kỳ. Bạn sẽ thắng cược khi số đó về vào giải đặc biệt ( giải cuối cùng)"),
n(o, "LOTTERY_SELECT_CHAN", "Cược tất cả các số chẵn. Bạn sẽ thắng cược khi kết quả về có ít nhất 14 số chẵn"),
n(o, "LOTTERY_SELECT_LE", "Cược tất cả các số lẻ. Bạn sẽ thắng cược khi kết quả về có ít nhất 14 số lẻ"),
n(o, "LOTTERY_SELECT_DAU", "Chọn dãy số bắt đầu bằng số bạn chọn. Bạn sẽ thắng cược khi có các kết quả bắt đầu bằng số bạn đã chọn"),
n(o, "LOTTERY_SELECT_DUOI", "Chọn dãy số kết thúc bằng số bạn chọn. Bạn sẽ thắng cược khi có các kết quả kết thúc bằng số bạn đã chọn"),
n(o, "LOTTERY_SELECT_TRANG", " Chọn tât cả các số trong ô trắng. Bạn sẽ thắng khi kết quả về ít nhất có 14 số trong ô trắng"),
n(o, "LOTTERY_SELECT_DO", "Chọn tât cả các số trong ô đỏ. Bạn sẽ thắng khi kết quả về ít nhất có 14 số trong ô đỏ"),
n(o, "LOTTERY_SELECT_XIEN_2", "Chọn 2 số bất kỳ. Bạn sẽ thắng cược khi cả 2 số đó có trong bảng kết quả"),
n(o, "LOTTERY_SELECT_XIEN_3", "Chọn 3 số bất kỳ. Bạn sẽ thắng cược khi cả 3 số đó có trong bảng kết quả"),
n(o, "LOTTERY_SELECT_XIEN_4", "Chọn 4 số bất kỳ. Bạn sẽ thắng cược khi cả 4 số đó có trong bảng kết quả"),
n(o, "LOTTERY_SELECT_HU", "Chọn 10 số bất kỳ. Bạn sẽ thắng 50% hũ khi kết quả về không có 10 số đã chọn (lô trượt), phí cược 10k"),
n(o, "LOTTERY_SELECT_REBETS", "Cược lại toàn bộ thông tin đặt của bạn phiên chơi trước"),
n(o, "LOTTERY_FIRST_BETS_NOT_SELECT", "Phiên trước bạn chưa cược gì"),
n(o, "LOTTERY_BETS_NOT_FORMAT", "Số lượng số không đúng với kiểu cược"),
n(o, "LOTTERY_NOT_CHANGE_BET", "Vui lòng đặt cược song hoặc đặt cược lại"),
n(o, "LOTTERY_NOT_START", "Vòng quay mới chưa được bắt đầu"),
n(o, "LOTTERY_SELECT_TYPE", "Vui lòng chọn kiểu cược"),
n(o, "LOTTERY_BET_DE", "<b>Đề</b>: {0} - ({1})"),
n(o, "LOTTERY_BET_LO", "<b>Lô</b>: {0} - ({1})"),
n(o, "LOTTERY_BET_XIEN_2", "<b>Xiên 2</b>: {0} - ({1})"),
n(o, "LOTTERY_BET_XIEN_3", "<b>Xiên 3</b>: {0} - ({1})"),
n(o, "LOTTERY_BET_XIEN_4", "<b>Xiên 4</b>: {0} - ({1})"),
n(o, "LOTTERY_BET_CHAN", "<b>Chẵn</b>: ({0})"),
n(o, "LOTTERY_BET_LE", "<b>Lẻ</b>: ({0})"),
n(o, "LOTTERY_BET_DAU", "<b>Đầu</b>: {0} - ({1})"),
n(o, "LOTTERY_BET_DUOI", "<b>Đuôi</b>: {0} - ({1})"),
n(o, "LOTTERY_BET_DO", "<b>Đỏ</b>: ({0})"),
n(o, "LOTTERY_BET_TRANG", "<b>Trắng</b>: ({0})"),
n(o, "LOTTERY_BET_HU", "<b>Hũ</b>: {0} - ({1})"),
n(o, "LOTTERY_BET_DE_2", "<b>Đề</b>: {0} - ({1})"),
n(o, "LOTTERY_BET_HU_2", "<b>Hũ</b>: {0} - ({1})"),
n(o, "LOTTERY_CHAT", " <color = #FCC63C>Chúc mừng tài khoản {0} đã thắng {1} ({2})</color>"),
o);
module.exports = s;
