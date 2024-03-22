function readAndDisplayMediaFiles() {
    // เก็บ URL ทั้งหมดที่มีไฟล์รูปภาพหรือวิดีโอ
    let mediaUrls = [];
    let mediaDetails = {};

    // อ่าน URL ทั้งหมดในหน้าเว็บไซต์
    let urls = Array.from(document.querySelectorAll('a[href]')).map(a => a.href);

    // ค้นหา URL ที่มีไฟล์รูปภาพหรือวิดีโอ
    urls.forEach(url => {
        let pathname = new URL(url).pathname;
            if (pathname.endsWith('.jpg') || pathname.endsWith('.png') || pathname.endsWith('.mp4') || pathname.endWith('.mu8d') || pathname.startWith('{
            mediaUrls.push(url);
            let mediaFileName = generateMediaFileName(url);
            let mediaDetail = getMediaDetail(pathname);
            mediaDetails[url] = { fileName: mediaFileName, detail: mediaDetail };
        }
    });

    // สร้าง HTML element สำหรับแสดงรูปภาพและวิดีโอ
    let popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.left = '10%';
    popup.style.right = '10%';
    popup.style.top = '10%';
    popup.style.overflowY = 'scroll';

    mediaUrls.forEach(url => {
        let mediaDetail = mediaDetails[url];
        let mediaElement;
        if (url.endsWith('.mp4')) {
            // สร้าง element video สำหรับวิดีโอ
            mediaElement = document.createElement('video');
            mediaElement.src = url;
            mediaElement.controls = true;
        } else {
            // สร้าง element img สำหรับรูปภาพ
            mediaElement = document.createElement('img');
            mediaElement.src = url;
            mediaElement.style.width = '100%';
            mediaElement.style.marginBottom = '20px';
        }
        mediaElement.alt = `Media - ${mediaDetail.detail}`;
        popup.appendChild(mediaElement);

        // สร้างลิงก์ดาวน์โหลด
        let downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = mediaDetail.fileName;
        downloadLink.textContent = 'ดาวน์โหลด';
        downloadLink.style.display = 'block';
        popup.appendChild(downloadLink);
    });

    // เพิ่ม popup ลงใน DOM
    document.body.appendChild(popup);
}

function generateMediaFileName(url) {
    let domain = new URL(url).hostname;
    let accountName = ''; // ต้องแยกชื่อ account จาก URL อีกครั้ง โดยอาจใช้วิธีการตัดข้อความออกจาก URL แล้วแยกชื่อ account ออกมา
    let fileName = `${domain}_${accountName}_${new Date().getTime()}.${getExtension(url)}`;
    return fileName;
}

function getExtension(url) {
    let pathname = new URL(url).pathname;
    let extension = pathname.split('.').pop();
    return extension;
}

function getMediaDetail(pathname) {
    let detail = 'Image';
    if (pathname.endsWith('.mp4')) {
        detail = 'Video';
    }
    return detail;
}

// เรียกใช้ฟังก์ชันเพื่ออ่านและแสดงไฟล์รูปภาพและวิดีโอ
document.addEventListener('DOMContentLoaded', readAndDisplayMediaFiles);