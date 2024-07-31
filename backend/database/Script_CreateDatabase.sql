-- Tạo bảng Account
CREATE TABLE Account (
    id SERIAL PRIMARY KEY,
    username VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(256) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'user')) DEFAULT 'user'
);	-- Dùng enum báo lỗi kiểu này không tồn tại

-- Tạo bảng Product_CPU
CREATE TABLE Product_CPU (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    brand VARCHAR(100) NOT NULL,
    socket VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    quantity INT NOT NULL CHECK (quantity > -1)  DEFAULT 0,
    price INT NOT NULL CHECK (price > -2)  DEFAULT 100000000
);

-- Tạo bảng lưu trữ URL ảnh CPU
CREATE TABLE List_Image_CPU (
    product_id INT NOT NULL REFERENCES Product_CPU(id) ON DELETE CASCADE,
    url VARCHAR(255) NOT NULL,
    orderProduct INT NOT NULL CHECK (orderProduct > -1)
);

	/*ON DELETE CASCADE: Khi một hàng trong bảng Product_CPU bị xóa,
	tất cả các hàng liên quan trong bảng List_Image_CPU cũng sẽ bị xóa tự động. 
	Điều này đảm bảo tính nhất quán giữa hai bảng.
	*/

-- Tạo bảng Product_RAM
CREATE TABLE Product_RAM (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    brand VARCHAR(100) NOT NULL,
    capacity VARCHAR(50) NOT NULL,
    bus_speed VARCHAR(50) NOT NULL,
    model VARCHAR(100) NOT NULL,
    quantity INT NOT NULL CHECK (quantity > -1)  DEFAULT 0,
    price INT NOT NULL CHECK (price > -2)  DEFAULT 100000000
);

-- Tạo bảng lưu trữ URL ảnh RAM
CREATE TABLE List_Image_RAM (
	product_id INT NOT NULL REFERENCES Product_RAM(id) ON DELETE CASCADE,
    url VARCHAR(255) NOT NULL,
    orderProduct INT NOT NULL CHECK (orderProduct > -1)
);


-- Tạo bảng Product_VGA
CREATE TABLE Product_VGA (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    brand VARCHAR(100) NOT NULL,
    memory VARCHAR(50) NOT NULL,
    gpu_chip VARCHAR(50) NOT NULL,
    memory_type VARCHAR(50) NOT NULL,
    quantity INT NOT NULL CHECK (quantity > -1)  DEFAULT 0,
    price INT NOT NULL CHECK (price > -2)  DEFAULT 100000000
);

-- Tạo bảng lưu trữ URL ảnh VGA
CREATE TABLE List_Image_VGA (
    product_id INT NOT NULL REFERENCES Product_VGA(id) ON DELETE CASCADE,
    url VARCHAR(255) NOT NULL,
    orderProduct INT NOT NULL CHECK (orderProduct > -1)
);

-- Tạo bảng Product_PSU
CREATE TABLE Product_PSU (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    brand VARCHAR(100) NOT NULL,
    standard VARCHAR(50) NOT NULL,
    power VARCHAR(50) NOT NULL,
    quantity INT NOT NULL CHECK (quantity > -1)  DEFAULT 0,
    price INT NOT NULL CHECK (price > -2)  DEFAULT 100000000 
);

-- Tạo bảng lưu trữ URL ảnh PSU
CREATE TABLE List_Image_PSU (
    product_id INT NOT NULL REFERENCES Product_PSU(id) ON DELETE CASCADE,
    url VARCHAR(255) NOT NULL,
    orderProduct INT NOT NULL CHECK (orderProduct > -1)
);

-- Tạo bảng Product_Monitor
CREATE TABLE Product_Monitor (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    brand VARCHAR(100) NOT NULL,
    resolution VARCHAR(50) NOT NULL,
    screen_size VARCHAR(50) NOT NULL,
    panel_type VARCHAR(50) NOT NULL,
    refresh_rate VARCHAR(50) NOT NULL,
    response_time VARCHAR(50) NOT NULL,
    quantity INT NOT NULL CHECK (quantity > -1)  DEFAULT 0,
    price INT NOT NULL CHECK (price > -2)  DEFAULT 100000000 
);

-- Tạo bảng lưu trữ URL ảnh Monitor
CREATE TABLE List_Image_Monitor (
    product_id INT NOT NULL REFERENCES Product_Monitor(id) ON DELETE CASCADE,
    url VARCHAR(255) NOT NULL,
    orderProduct INT NOT NULL CHECK (orderProduct > -1)
);


-- Tạo bảng Product_Storage
CREATE TABLE  Product_Storage (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    brand VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL,
    capacity VARCHAR(50) NOT NULL,
    quantity INT NOT NULL CHECK (quantity > -1)  DEFAULT 0,
    price INT NOT NULL CHECK (price > -2)  DEFAULT 100000000 
);

-- Tạo bảng lưu trữ URL ảnh Storage
CREATE TABLE List_Image_Storage (
    product_id INT NOT NULL REFERENCES Product_Storage(id) ON DELETE CASCADE,
    url VARCHAR(255) NOT NULL,
    orderProduct INT NOT NULL CHECK (orderProduct > -1)
);

-- Tạo bảng Bill_Info
CREATE TABLE Bill_Info (
    id SERIAL PRIMARY KEY,	
    account_id INT NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL CHECK (email ~ '^[^@]+@[^@]+\.[^@]+$') ,
    address VARCHAR(255) NOT NULL,
    invoice_date TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP, -- TIMESTAMP(0) không hiển thị số thập phân sau  đơn vị giây 
    total_money INT NOT NULL CHECK (total_money > -1),
	status VARCHAR(100) NOT NULL CHECK (status IN ('Chờ', 'Chấp nhận' , 'Từ chối', 'Thành công' ,'Hủy đơn' ,'Hoàn trả')) DEFAULT 'Chờ',
	note VARCHAR(255),
    FOREIGN KEY (account_id) REFERENCES Account(id)
);

-- Tạo bảng Bill_Detail
CREATE TABLE  Bill_Detail (
    id SERIAL PRIMARY KEY,
    bill_info_id INT NOT NULL,
    product_id INT NOT NULL,
    product_type VARCHAR(50) CHECK (product_type IN ('CPU' , 'VGA' , 'MONITOR' , 'RAM' , 'PSU' , 'STORAGE')) NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    price INT NOT NULL CHECK(price > -1),
    FOREIGN KEY (bill_info_id) REFERENCES Bill_Info(id)
);
