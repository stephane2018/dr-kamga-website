import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import * as XLSX from "xlsx"

export async function GET(request: NextRequest) {
  try {
    const subscriptions = await prisma.newsletter.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        subscribedAt: "desc",
      },
    })

    // Prepare data for Excel
    const data = subscriptions.map((sub, index) => ({
      "#": index + 1,
      "Email": sub.email,
      "Langue": sub.language === "fr" ? "Français" : "English",
      "Date d'inscription": new Date(sub.subscribedAt).toLocaleDateString("fr-FR"),
      "Statut": sub.isActive ? "Actif" : "Inactif",
    }))

    // Create workbook
    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Abonnés Newsletter")

    // Set column widths
    worksheet["!cols"] = [
      { wch: 5 },  // #
      { wch: 35 }, // Email
      { wch: 15 }, // Langue
      { wch: 20 }, // Date
      { wch: 10 }, // Statut
    ]

    // Generate Excel file buffer
    const excelBuffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" })

    // Return Excel file
    return new NextResponse(excelBuffer, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename=newsletter-subscriptions-${new Date().toISOString().split("T")[0]}.xlsx`,
      },
    })
  } catch (error) {
    console.error("Error exporting newsletter subscriptions:", error)
    return NextResponse.json(
      { success: false, error: "Erreur lors de l'export" },
      { status: 500 }
    )
  }
}
